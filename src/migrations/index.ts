import * as migration_20260306_192852_initial from './20260306_192852_initial';

export const migrations = [
  {
    up: migration_20260306_192852_initial.up,
    down: migration_20260306_192852_initial.down,
    name: '20260306_192852_initial'
  },
];
