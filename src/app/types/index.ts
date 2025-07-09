export type FetchResponse<T> = {
  Data?: T;
  Loading: boolean;
  Error?: boolean;
};
export type PerencanaanResponse<T> = {
  code: number;
  status: string;
  data?: T;
}

export type UsePostResponse<T> = {
  data: T | null;
  proses: boolean; // Mengindikasikan loading/proses
  error: boolean; // Mengindikasikan error
  message: string | null; // Pesan hasil operasi
}

export type ResultPostResponse = {
  message: string;
}

export type ApiResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  errors: string[];
  timestamp: string; // This is typically a string in ISO 8601 format
}

interface OperasionalDaerah {
  nama_opd: string;
  kode_opd: string;
}
interface UserInfo {
  nip: string;
  nama: string;
}

//Verifikasi
export type VerifikasiFormValue = {
  status: string;
  keterangan: string;
  nip_verifikator: string;
}

// jenis risiko
export type RisikoResponse = {
  id?: number;
  jenis_risiko: string;
  uraian: string;
}
export type JenisRisikoBody = {
  jenis_risiko: string;
  uraian: string;
}

// list pegawai
export type PegawaiResponse = {
  id: number;
  nama_pegawai: string;
  nip: string;
  kode_opd: string;
  nama_opd: string;
}

// list opd
export type OpdResponse = {
  id: string;
  kode_opd: string;
  nama_opd: string;
  singkatan: string;
  alamat: string;
  telepon: string;
  fax: string;
  email: string;
  website: string;
  nama_kepala_opd: string;
  nip_kepala_opd: string;
  pangkat_kepala: string;
}

// rencana kinerja
interface Target {
  id_target: string;
  indikator_id: string;
  target: string;
  satuan: string;
}
interface Indikator {
  id_indikator: string;
  rencana_kinerja_id: string;
  nama_indikator: string;
  targets: Target[];
  manual_ik_exist: boolean;
}

export type RencanaKinerjaValue = {
  id_rencana_kinerja: string;
  id_pohon: number;
  nama_pohon: string;
  level_pohon: number;
  nama_rencana_kinerja: string;
  tahun: string;
  status_rencana_kinerja: string;
  operasional_daerah: OperasionalDaerah;
  pegawai_id: string;
  nama_pegawai: string;
  indikator: Indikator[];
}

//fraud identifikasi
export type IdentifikasiFraudValue = {
  id: number,
  id_rencana_kinerja: string;
  id_pohon: number,
  nama_pohon: string;
  level_pohon: number,
  nama_rencana_kinerja: string;
  tahun: string;
  status_rencana_kinerja: string;
  pegawai_id: string;
  nama_pegawai: string;
  operasional_daerah: {
    kode_opd: string;
    nama_opd: string;
  },
  nama_risiko: string;
  jenis_risiko: string;
  kemungkinan_kecurangan: string;
  indikasi: string;
  kemungkinan_pihak_terkait: string;
  status: string;
  keterangan: string;
  pembuat: {
    nama: string;
    nip: string;
    golongan: string;
  },
  verifikator: {
    nama: string;
    nip: string;
    golongan: string;
  },
}
export type IdentifikasiFraudPost = {
  nama_pegawai?: string;
  nama_rencana_kinerja?: string;
  pegawai_id?: string;

  id_rencana_kinerja: string;
  nama_risiko: string;
  jenis_risiko: string;
  strategi?: string;
  uraian: string;
  kemungkinan_kecurangan: string;
  indikasi: string;
  kemungkinan_pihak_terkait: string;
  nip_pembuat: string;
}

// fraud analisa
export type AnalisaFraudValue = {
  id: number;
  id_rencana_kinerja: string;
  id_pohon: number;
  nama_pohon: string;
  level_pohon: number;
  nama_rencana_kinerja: string;
  tahun: string;
  status_rencana_kinerja: string;
  pegawai_id: string;
  nama_pegawai: string;
  operasional_daerah: OperasionalDaerah;
  nama_risiko: string;
  penyebab: string;
  akibat: string;
  skala_dampak: number;
  skala_kemungkinan: number;
  tingkat_risiko: number;
  level_risiko: string;
  status: string;
  keterangan: string;
}
export type AnalisaFraudFormPost = {
  nama_pegawai?: string;
  nama_rencana_kinerja?: string;
  pegawai_id?: string;

  id_rencana_kinerja: string;
  nama_risiko: string;
  penyebab: string;
  akibat: string;
  skala_dampak: number;
  skala_kemungkinan: number;
  nip_pembuat: string;
}

// fraud penanganan
export type PenangananFraudValue = {
  id: number;
  id_rencana_kinerja: string;
  id_pohon: number;
  nama_pohon: string;
  level_pohon: number;
  nama_rencana_kinerja: string;
  tahun: string;
  status_rencana_kinerja: string;
  pegawai_id: string;
  nama_pegawai: string;
  operasional_daerah: OperasionalDaerah;
  existing_control: string;
  jenis_perlakuan_risiko: string;
  rencana_perlakuan_risiko: string;
  biaya_perlakuan_risiko: string;
  target_waktu: string;
  pic: string;
  status: string;
  keterangan: string;
}
export type PenangananFraudPostValue = {
  nama_pegawai?: string,
  nama_rencana_kinerja?: string,
  pegawai_id?: string;

  id_rencana_kinerja: string;
  existing_control: string;
  jenis_perlakuan_risiko: string;
  rencana_perlakuan_risiko: string;
  biaya_perlakuan_risiko: string;
  target_waktu: string;
  pic: string;
  nip_pembuat: string;
}

// fraud pemantauan RTP
export type PemantauanFraudValue = {
  id: number;
  id_rencana_kinerja: string;
  id_pohon: number;
  nama_pohon: string;
  level_pohon: number;
  nama_rencana_kinerja: string;
  tahun: string;
  status_rencana_kinerja: string;
  pegawai_id: string;
  nama_pegawai: string;
  operasional_daerah: OperasionalDaerah;
  pemilik_risiko: string;
  risiko_kecurangan: string;
  deskripsi_kegiatan_pengendalian: string;
  pic: string;
  rencana_waktu_pelaksanaan: string;
  realisasi_waktu_pelaksanaan: string;
  progres_tindak_lanjut: string;
  bukti_pelaksanaan_tindak_lanjut: string;
  kendala: string;
  catatan: string;
  status: string;
  keterangan: string;
  pembuat: {
    nama: string;
    nip: string;
    golongan: string;
  }
}
export type PemantauanFraudPostValue = {
  pegawai_id?: string;
  nama_pegawai?: string;

  id_rencana_kinerja: string;
  pemilik_risiko: string;
  risiko_kecurangan: string;
  deskripsi_kegiatan_pengendalian: string;
  pic: string;
  rencana_waktu_pelaksanaan: string;
  realisasi_waktu_pelaksanaan: string;
  progres_tindak_lanjut: string;
  bukti_pelaksanaan_tindak_lanjut: string;
  kendala: string;
  catatan: string;
  nip_pembuat: string;
}

// fraud hasil pemantauan
export type HasilPemantauanFraudValue = {
  id: number;
  id_rencana_kinerja: string;
  id_pohon: number;
  nama_pohon: string;
  level_pohon: number;
  nama_rencana_kinerja: string;
  tahun: string;
  status_rencana_kinerja: string;
  pegawai_id: string;
  nama_pegawai: string;
  operasional_daerah: OperasionalDaerah;
  pemilik_risiko: string;
  risiko_kecurangan: string;
  deskripsi_kegiatan_pengendalian: string;
  pic: string;
  rencana_waktu_pelaksanaan: string;
  realisasi_waktu_pelaksanaan: string;
  progres_tindak_lanjut: string;
  bukti_pelaksanaan_tindak_lanjut: string;
  kendala: string;
  catatan: string;
  status: string;
  keterangan: string;
  skala_dampak: number;
  skala_kemungkinan: number;
  tingkat_risiko: number;
  level_risiko: string;
  status_hasil_pemantauan: string;
  keterangan_hasil_pemantauan: string;
  pembuat: UserInfo;
  verifikator: UserInfo;
  created_at: string; // ISO 8601 string
  updated_at: string; // ISO 8601 string
}
export type HasilPemantauanFraudPostValue = {
  risiko_kecurangan?: string;
  deskripsi_kegiatan_pengendalian?: string;
  id_rencana_kinerja: string;
  skala_dampak: number;
  skala_kemungkinan: number;
  catatan?: string;
  nip_pembuat: string;
}
