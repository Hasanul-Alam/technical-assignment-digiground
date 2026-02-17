import { useCallback, useRef, useState } from "react";

interface UseInfiniteScrollOptions {
  initialOffset?: number;
  pageSize?: number;
}

interface UseInfiniteScrollResult {
  offset: number;
  hasMore: boolean;
  isLoadingMore: boolean;
  loadMore: () => void;
  reset: () => void;
  setHasMore: (value: boolean) => void;
  setIsLoadingMore: (value: boolean) => void;
}

/**
 * Hook for managing infinite scroll pagination
 */
export const useInfiniteScroll = ({
  initialOffset = 0,
  pageSize = 20,
}: UseInfiniteScrollOptions = {}): UseInfiniteScrollResult => {
  const [offset, setOffset] = useState(initialOffset);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadingRef = useRef(false);

  const loadMore = useCallback(() => {
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    setIsLoadingMore(true);
    setOffset((prev) => prev + pageSize);
  }, [hasMore, pageSize]);

  const reset = useCallback(() => {
    setOffset(initialOffset);
    setHasMore(true);
    setIsLoadingMore(false);
    loadingRef.current = false;
  }, [initialOffset]);

  const updateHasMore = useCallback((value: boolean) => {
    setHasMore(value);
    loadingRef.current = false;
    setIsLoadingMore(false);
  }, []);

  const updateIsLoadingMore = useCallback((value: boolean) => {
    setIsLoadingMore(value);
    loadingRef.current = value;
  }, []);

  return {
    offset,
    hasMore,
    isLoadingMore,
    loadMore,
    reset,
    setHasMore: updateHasMore,
    setIsLoadingMore: updateIsLoadingMore,
  };
};
