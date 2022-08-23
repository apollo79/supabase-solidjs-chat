import { JSXElement } from 'solid-js';

type PropsWithChildren = { children: JSXElement };

type ExtendPropsWithChildren<T extends Record<string, unknown> = Record<never, never>> = T & PropsWithChildren;

export type { ExtendPropsWithChildren, PropsWithChildren };
