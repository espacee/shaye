import * as migration_20260306_205121 from './20260306_205121';

export const migrations = [
  {
    up: migration_20260306_205121.up,
    down: migration_20260306_205121.down,
    name: '20260306_205121'
  },
];
