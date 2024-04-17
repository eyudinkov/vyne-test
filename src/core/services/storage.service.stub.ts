import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageServiceStub {
  store = {} as any;
  storage = {
    getItem: (key: string) => {
      return key in this.store ? this.store[key] : null;
    },
    setItem: (key: string, value: string) => {
      this.store[key] = value;
    },
    removeItem: (key: string) => {
      delete this.store[key];
    },
    clear: () => {
      this.store = {};
    },
  };

  get length(): number {
    return Object.keys(this.store).length;
  }

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  key(index: number): string | null {
    return Object.keys(this.storage)[index];
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }
}
