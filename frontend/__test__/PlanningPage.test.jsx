// src/tests/PlanningPage.test.tsx

import { render, screen, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import '@testing-library/jest-dom';
import { useGlobalContext } from "../src/context.tsx";
import PlanningPage from "../src/pages/Planning";

// Mocking the context
jest.mock('../../context', () => ({
  useGlobalContext: jest.fn()
}));

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('PlanningPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading state', () => {
        useGlobalContext.mockReturnValue({ user: { loading: true } });
        render(() => <PlanningPage />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('renders error state', () => {
        useGlobalContext.mockReturnValue({ user: { error: { message: 'Error message' } } });
        render(() => <PlanningPage />);
        expect(screen.getByText('Error: Error message')).toBeInTheDocument();
    });

    test('renders no user data state', () => {
        useGlobalContext.mockReturnValue({ user: {} });
        render(() => <PlanningPage />);
        expect(screen.getByText('No user data available')).toBeInTheDocument();
    });

    test('renders calendar with events', async () => {
        const user = { latest: { id: 1 }, state: 'ready' };
        const events = [{ id: 1, title: 'Event 1', start_date: '2023-05-28T00:00:00Z', end_date: '2023-05-29T00:00:00Z' }];

        useGlobalContext.mockReturnValue({ user });
        mockFetch.mockResolvedValueOnce({
            json: async () => events
        });

        render(() => <PlanningPage />);

        await waitFor(() => {
            expect(screen.getByText('Event 1')).toBeInTheDocument();
        });
    });
});




