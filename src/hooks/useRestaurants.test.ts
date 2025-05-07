import { createTestWrapper } from "../../test/testUtils";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useRestaurants } from "./useRestaurants";

const setupFetchMock = (data: unknown, ok = true) => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok,
      json: () => Promise.resolve(data),
    } as Response)
  );
};

describe("useRestaurants", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should fetch restaurants successfully", async () => {
    // Arrange
    const mockData = [
      {
        id: 1,
        name: "Burger Kingdom",
        image: "burger.jpg",
        rating: 4.5,
        description: "Best burgers in town",
        isNew: true,
        categories: ["Burgers"],
        address: "123 Main St",
        hours: "9-5",
        priceRange: "$$",
        phone: "555-1234",
        menu: [],
        reviews: [],
      },
    ];
    setupFetchMock(mockData);

    // Act
    const { result } = renderHook(() => useRestaurants(), {
      wrapper: createTestWrapper(),
    });

    // Assert
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.restaurants).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3001/restaurants"
    );
  });

  it("should get a restaurant by ID", async () => {
    // Arrange
    const mockData = [
      {
        id: 1,
        name: "Burger Kingdom",
        image: "burger.jpg",
        rating: 4.5,
        description: "Best burgers in town",
        isNew: true,
        categories: ["Burgers"],
        address: "123 Main St",
        hours: "9-5",
        priceRange: "$$",
        phone: "555-1234",
        menu: [],
        reviews: [],
      },
      {
        id: 2,
        name: "Pizza Palace",
        image: "pizza.jpg",
        rating: 4.2,
        description: "Amazing pizzas",
        isNew: false,
        categories: ["Pizza", "Italian"],
        address: "456 Oak St",
        hours: "11-10",
        priceRange: "$$",
        phone: "555-5678",
        menu: [],
        reviews: [],
      },
    ];
    setupFetchMock(mockData);

    // Act
    const { result } = renderHook(() => useRestaurants(), {
      wrapper: createTestWrapper(),
    });

    // Assert
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.getRestaurantById(1)).toEqual(mockData[0]);
    expect(result.current.getRestaurantById(2)).toEqual(mockData[1]);
    expect(result.current.getRestaurantById(999)).toBeUndefined();
  });

  it("should handle fetch errors", async () => {
    // Arrange
    setupFetchMock(null, false);

    // Act
    const { result } = renderHook(() => useRestaurants(), {
      wrapper: createTestWrapper(),
    });

    // Assert
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.restaurants).toBeUndefined();
    expect(result.current.error).toBeDefined();
    expect(result.current.error?.message).toBe("Network response was not ok");
  });
});
