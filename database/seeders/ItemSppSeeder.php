<?php

namespace Database\Seeders;

use App\Models\ItemSpp;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ItemSppSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $itemSpps = [
            [
                'kd_spp' => 'SPP00001',
                'nama_item' => 'SPP Januari',
                'tahun_ajaran' => '2024/2025',
                'biaya' => 200000,
                'status' => 1
            ],
            [
                'kd_spp' => 'SPP00002',
                'nama_item' => 'SPP Februari',
                'tahun_ajaran' => '2024/2025',
                'biaya' => 200000,
                'status' => 1
            ],
            [
                'kd_spp' => 'SPP00003',
                'nama_item' => 'SPP Maret',
                'tahun_ajaran' => '2024/2025',
                'biaya' => 200000,
                'status' => 1
            ],
            [
                'kd_spp' => 'SPP00004',
                'nama_item' => 'SPP April',
                'tahun_ajaran' => '2024/2025',
                'biaya' => 200000,
                'status' => 1
            ],
            [
                'kd_spp' => 'SPP00005',
                'nama_item' => 'SPP Mei',
                'tahun_ajaran' => '2024/2025',
                'biaya' => 200000,
                'status' => 1
            ],
            [
                'kd_spp' => 'SPP00006',
                'nama_item' => 'SPP Juni',
                'tahun_ajaran' => '2024/2025',
                'biaya' => 200000,
                'status' => 1
            ],
            [
                'kd_spp' => 'SPP00007',
                'nama_item' => 'SPP Juli',
                'tahun_ajaran' => '2024/2025',
                'biaya' => 200000,
                'status' => 1
            ],
            [
                'kd_spp' => 'SPP00008',
                'nama_item' => 'SPP Agustus',
                'tahun_ajaran' => '2024/2025',
                'biaya' => 200000,
                'status' => 1
            ],
            [
                'kd_spp' => 'SPP00009',
                'nama_item' => 'SPP September',
                'tahun_ajaran' => '2024/2025',
                'biaya' => 200000,
                'status' => 1
            ],
            [
                'kd_spp' => 'SPP00010',
                'nama_item' => 'SPP Oktober',
                'tahun_ajaran' => '2024/2025',
                'biaya' => 200000,
                'status' => 1
            ],
            [
                'kd_spp' => 'SPP00011',
                'nama_item' => 'SPP November',
                'tahun_ajaran' => '2024/2025',
                'biaya' => 200000,
                'status' => 1
            ],
            [
                'kd_spp' => 'SPP00012',
                'nama_item' => 'SPP Desember',
                'tahun_ajaran' => '2024/2025',
                'biaya' => 200000,
                'status' => 1
            ]
        ];

        foreach ($itemSpps as $itemSpp) {
            ItemSpp::create($itemSpp);
        }
    }
}
