
import { render } from "solid-testing-library";
import { screen, waitFor } from "@testing-library/dom";
import "@testing-library/jest-dom";
import PlanningPage from "../src/pages/Planning";
import { useGlobalContext } from "../src/context.tsx";
import { expect } from "vitest";

jest.mock("../src/context.tsx", () => ({
    useGlobalContext: jest.fn(),
}));

const mockUser = {
    state: "ready",
    latest: { id: 1 },
    loading: false,
    error: null,
};

describe("PlanningPage", () => {
    beforeEach(() => {
        (useGlobalContext as jest.Mock).mockReturnValue({
            user: mockUser,
        });

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([
                    { id: 1, title: "Event 1", start_date: "2023-05-28T00:00:00Z", end_date: "2023-05-29T00:00:00Z" },
                ]),
            })
        );
    });

    test("renders PlanningPage with events", async () => {
        render(() => <PlanningPage />);

        expect(screen.getByText("Planning")).toBeInTheDocument();

        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

        await waitFor(() => {
            expect(screen.getByText("Event 1")).toBeInTheDocument();
        });
    });

    test("renders loading state", () => {
        (useGlobalContext as jest.Mock).mockReturnValueOnce({
            user: { ...mockUser, loading: true },
        });

        render(() => <PlanningPage />);

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    test("renders error state", () => {
        (useGlobalContext as jest.Mock).mockReturnValueOnce({
            user: { ...mockUser, error: { message: "Error occurred" } },
        });

        render(() => <PlanningPage />);

        expect(screen.getByText("Error: Error occurred")).toBeInTheDocument();
    });

    test("renders no user data state", () => {
        (useGlobalContext as jest.Mock).mockReturnValueOnce({
            user: { ...mockUser, latest: null },
        });

        render(() => <PlanningPage />);

        expect(screen.getByText("No user data available")).toBeInTheDocument();
    });
});
