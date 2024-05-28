// src/tests/Calendar.test.tsx

import { render, screen } from '@solidjs/testing-library';
import '@testing-library/jest-dom';
import Calendar from "../src/Components/Calendar";

describe('Calendar', () => {
    test('renders calendar structure', () => {
        render(() => <Calendar events={[]} />);
        expect(screen.getByText('Sun')).toBeInTheDocument();
        expect(screen.getByText('Mon')).toBeInTheDocument();
        expect(screen.getByText('Tue')).toBeInTheDocument();
        expect(screen.getByText('Wed')).toBeInTheDocument();
        expect(screen.getByText('Thu')).toBeInTheDocument();
        expect(screen.getByText('Fri')).toBeInTheDocument();
        expect(screen.getByText('Sat')).toBeInTheDocument();
    });

    test('renders events on correct dates', () => {
        const events = [{ id: 1, title: 'Event 1', start: new Date(2023, 4, 28), end: new Date(2023, 4, 29) }];
        render(() => <Calendar events={events} />);
        expect(screen.getByText('Event 1')).toBeInTheDocument();
    });
});