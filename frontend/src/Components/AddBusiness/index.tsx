import { Alert, Button, Input, Space } from "@jundao/design";
import { Show, createSignal } from "solid-js";
import type { Enterprise } from "../../context";
//import "./index.css";

const AddBusiness = () => {
	const [newEnterprise, setNewEnterprise] = createSignal<Enterprise>({
		name: "",
		description: "",
		logo_url: "",
		website_url: "",
	});
	const [isSubmitting, setIsSubmitting] = createSignal(false);
	const [error, setError] = createSignal<string>();
	const [success, setSuccess] = createSignal<string>();

	const handleSubmit = async () => {
		setIsSubmitting(true);
		!setError();
		!setSuccess();

		if (newEnterprise().name === "") {
			setError("Pas de nom pour l'entreprise.");
			setIsSubmitting(false);
			return;
		}

		try {
			const response = await fetch("/api/enterprises", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newEnterprise()),
			});

			if (response.ok) {
				setSuccess("Entreprise créée avec succès !");
				setNewEnterprise({
					name: "",
					description: "",
					logo_url: "",
					website_url: "",
				});
			}
		} catch (error) {
			setError(`Error adding enterprise: ${error.message}`);
		}
		setIsSubmitting(false);
	};

	return (
		<div class="container">
			<Space vertical>
				<Space wrap align="center">
					<Input
						label="Nom"
						class="input"
						placeholder="Acme Inc."
						value={newEnterprise().name}
						onChange={(newName) => {
							setNewEnterprise((prev) => ({ ...prev, name: newName }));
						}}
						required
					/>
					<Input
						label="Description"
						class="input"
						type="textarea"
						placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pharetra purus nunc, quis condimentum leo porttitor eget. Integer ultricies purus in diam bibendum dignissim."
						value={newEnterprise().description}
						onChange={(newDesc) => {
							setNewEnterprise((prev) => ({ ...prev, description: newDesc }));
						}}
					/>
					<Input
						label="Website"
						class="input"
						placeholder="https://www.example.com"
						value={newEnterprise().website_url}
						onChange={(newWeb) => {
							setNewEnterprise((prev) => ({ ...prev, website_url: newWeb }));
						}}
						required
					/>
				</Space>

				<Show when={success()}>
					<Alert type="success" closable message={success()} />
				</Show>
				<Show when={error()}>
					<Alert type="error" closable message={error()} />
				</Show>

				<Button
					type="primary"
					onClick={handleSubmit}
					disabled={isSubmitting()}
					loading={isSubmitting()}
				>
					Ajouter l'entreprise
				</Button>
			</Space>
		</div>
	);
};

export default AddBusiness;
