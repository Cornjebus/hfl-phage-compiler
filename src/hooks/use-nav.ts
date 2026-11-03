"use client";

/**
 * Navigation filtering. The Clerk RBAC/organization context is gone (this
 * template uses Better Auth, single-owner) — items carrying an `access`
 * restriction are hidden, everything else shows. Grows real RBAC only if
 * the app grows roles.
 */

import { useMemo } from 'react';
import type { NavItem, NavGroup } from '@/types';

export function useFilteredNavItems(items: NavItem[]) {
  return useMemo(
    () =>
      items
        .filter((item) => !item.access)
        .map((item) =>
          item.items && item.items.length > 0
            ? { ...item, items: item.items.filter((child) => !child.access) }
            : item
        ),
    [items]
  );
}

export function useFilteredNavGroups(groups: NavGroup[]) {
  return useMemo(
    () =>
      groups
        .map((group) => ({
          ...group,
          items: group.items
            .filter((item) => !item.access)
            .map((item) =>
              item.items && item.items.length > 0
                ? { ...item, items: item.items.filter((child) => !child.access) }
                : item
            )
        }))
        .filter((group) => group.items.length > 0),
    [groups]
  );
}
