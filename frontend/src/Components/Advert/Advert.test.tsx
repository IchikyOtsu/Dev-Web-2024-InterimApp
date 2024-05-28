import { render, fireEvent, screen } from '@solidjs/testing-library';
import { AdvertCard } from '../Advert';
import { vi, describe, test } from 'vitest';
import { createSignal } from 'solid-js';

// Mock global context
const useGlobalContext = () => ({
    user: {
        id: 1,
        role: 'enterprise',
        enterprise_id: 1 
    } 
});

// Mock the fetch function
global.fetch = vi.fn();

const advertData = {
  id: 1,
  enterprise_id: 1,
  company: 'Test Company',
  image_url: 'test.jpg',
  title: 'Test Advert',
  description: 'Test Description',
  location: 'Test Location',
  salary: '100',
//   start_date: '2023-01-01',
//   end_date: '2023-12-31',
  start_date: '2024-04-30T22:00:00.000Z',
  end_date: '2024-05-30T22:00:00.000Z',
  status: 'active',
};

describe('AdvertCard Component', () => {
  test('should mark advert as expired when deleteAdvert is called', async () => {
    // Arrange
    fetch.mockResolvedValueOnce({ ok: true });
    
    const { container } = render(() => <AdvertCard advertData={advertData} edit={true} />);
    
    // Act
    fireEvent.click(screen.getByText('Supprimer'));
    fireEvent.click(screen.getByText('Oui'));

    // Assert
    expect(fetch).toHaveBeenCalledWith(`/api/adverts/${advertData.id}`, expect.objectContaining({
      method: 'PUT',
      body: JSON.stringify(expect.objectContaining({ status: 'expired' })),
    }));
  });

  test('should open delete modal when delete button is clicked', () => {
    // Arrange
    render(() => <AdvertCard advertData={advertData} edit={true} />);

    // Act
    fireEvent.click(screen.getByText('Supprimer'));

    // Assert
    expect(screen.getByText('Êtes-vous sûr de vouloir supprimer cette annonce ?')).toBeInTheDocument();
  });

  test('should close delete modal without deleting when No is clicked', () => {
    // Arrange
    render(() => <AdvertCard advertData={advertData} edit={true} />);

    // Act
    fireEvent.click(screen.getByText('Supprimer'));
    fireEvent.click(screen.getByText('Non'));

    // Assert
    expect(screen.queryByText('Êtes-vous sûr de vouloir supprimer cette annonce ?')).not.toBeInTheDocument();
  });
});
