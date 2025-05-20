import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import App from './App';

const globalObject: any = global as any;
globalObject.fetch = async function (url: any, init?: any): Promise<any> {
  if (url.includes('products')) {
    return Promise.resolve({
      json: () => Promise.resolve([{
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "rating": {
          "rate": 3.9,
          "count": 120
        }
      }]),
      ok: true
    })
  }
  return Promise.reject('Failed to fetch');
}

describe('Landing Page Test Cases', () => {
  beforeEach(() => {
    render(<MemoryRouter><App /></MemoryRouter>);
  });
  test('Landing Page Rendered with Go TO Products button', () => {
    const btnElement = screen.getByText(/Go To Products/i);
    expect(btnElement).toBeInTheDocument();
  });

  test('Landing Page Rendered with Welcome to Landing Page Text', () => {
    const textElement = screen.getByText(/Welcome to Landing Page/gi);
    expect(textElement).toBeInTheDocument();
  });

  test('Products Nav Button Click & Change view, sort', async () => {
    const landingPageProductsBtn = screen.getByText(/Go To Products/i);
    fireEvent.click(landingPageProductsBtn);
    const lodingText = screen.getByText(/Loading..../gi);
    expect(lodingText).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops/gi)).toBeInTheDocument());
    const descSort = screen.getByText(/High/gi);
    const ascSort = screen.getByText(/Low/gi);
    const mode = screen.getByText(/Table/gi);

    fireEvent.click(descSort);
    fireEvent.click(ascSort);
    fireEvent.click(mode);
  })
  test('Fetch Error', () => {
    globalObject.fetch = async function (url: any, init?: any): Promise<any> {
      if (!url.includes('products')) {
        return Promise.resolve({
          json: () => Promise.resolve([{
            "id": 1,
            "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            "price": 109.95,
            "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            "category": "men's clothing",
            "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            "rating": {
              "rate": 3.9,
              "count": 120
            }
          }]),
          ok: true
        })
      }
      return Promise.reject('Failed to fetch');
    }
    const lodingText = screen.getByText(/Loading..../gi);
    expect(lodingText).toBeInTheDocument();
  })
});

describe('App Navigation test cases', () => {
  beforeEach(() => {
    render(<MemoryRouter><App /></MemoryRouter>);
  });
  test('Home Navigation Present', () => {
    const homeNav = screen.getAllByText(/Home/gi);
    expect(homeNav[0]).toBeInTheDocument();
    fireEvent.click(homeNav[0]);
    fireEvent.click(homeNav[1]);
  });
  test('Products Navigation Present', () => {
    const productNav = screen.getAllByText(/products/gi);
    expect(productNav[0]).toBeInTheDocument();
    fireEvent.click(productNav[0]);
    fireEvent.click(productNav[1]);
  });

  test("close nav bar close btn", () => {
    const elementBtn = screen.getByTestId('close-btn');
    fireEvent.click(elementBtn);
  })
});