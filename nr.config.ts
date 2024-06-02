import fs from 'node:fs/promises';
import path from 'node:path';

import defineConfig from '@darkobits/nr';
import { defaultPackageScripts } from '@darkobits/ts';

export default defineConfig([
  defaultPackageScripts,
  ({ command, fn, script }) => {
    // When publishing this package, we use re-pack's 'publish' command to
    // publish from the .re-pack folder rather than `npm publish`.
    script('publish', [
      // Re-pack the project.
      command('re-pack'),
      // Publish the project from the re-pack directory.
      command('re-pack', { args: 'publish' }),
      // Push the release commit.
      command('git', {
        args: ['push', 'origin', 'HEAD', { setUpstream: true, followTags: true }]
      }),
      // Remove the re-pack directory.
      fn(() => fs.rm(path.resolve('.re-pack'), {
        recursive: true,
        force: true
      }))
    ], {
      group: 'Release',
      description: 'Publish the package using re-pack.'
    });
  }
]);
