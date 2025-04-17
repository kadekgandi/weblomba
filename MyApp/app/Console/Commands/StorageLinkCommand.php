<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class StorageLinkCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'storage:link';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a symbolic link from "public/storage" to "storage/app/public"';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $target = storage_path('app/public');
        $link = $this->publicPath('storage'); // Use custom publicPath() function

        if (file_exists($link)) {
            $this->error('The "public/storage" directory already exists.');
            return;
        }

        File::link($target, $link);

        $this->info('The [public/storage] directory has been linked.');
    }

    /**
     * Custom public_path function for Lumen.
     *
     * @param string $path
     * @return string
     */
    private function publicPath($path = '')
    {
        return base_path('public') . ($path ? DIRECTORY_SEPARATOR . $path : $path);
    }
}
