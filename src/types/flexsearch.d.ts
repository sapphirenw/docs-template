declare module 'flexsearch' {
  export interface Index<T = unknown> {
    add(id: number | string, content: string): void;
    search(query: string, limit?: number): (number | string)[];
    remove(id: number | string): void;
  }

  export interface Document<T = unknown> {
    add(doc: T): void;
    search(query: string, options?: object): Array<{ field: string; result: string[] }>;
    remove(id: string | number): void;
  }

  export function create<T = unknown>(options?: object): Index<T>;

  export class Index<T = unknown> {
    constructor(options?: object);
    add(id: number | string, content: string): void;
    search(query: string, limit?: number): (number | string)[];
    remove(id: number | string): void;
  }

  export class Document<T = unknown> {
    constructor(options?: object);
    add(doc: T): void;
    search(query: string, options?: object): Array<{ field: string; result: string[] }>;
    remove(id: string | number): void;
  }
}
