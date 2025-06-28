import Swal, { SweetAlertResult } from 'sweetalert2';

export const AlertNotification = (
    title: string,
    text: string,
    icon: "success" | "error" | "warning" | "info" | "question",
    timer: number,
    confirm: boolean,
) => {
    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        timer: timer,
        showConfirmButton: confirm,
    });
}

export const AlertQuestion = (
    title: string,
    text: string,
    icon: "success" | "error" | "warning" | "info" | "question",
    confirmButtonText: string,
    cancelButtonText: string,
): Promise<SweetAlertResult<any>> => {
    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#2F2F30",
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        reverseButtons: true
    });
}
export const AlertVerifikasi = (
    title: string,
    text: string,
    icon: "success" | "error" | "warning" | "info" | "question",
    confirmButtonText: string,
    denyButtonText: string,
    cancelButtonText: string,
): Promise<SweetAlertResult<any>> => {
    return Swal.fire({
        title: title,
        html: `
      ${text ? `<p>${text}</p>` : ''}
      <input id="swal-input-keterangan" class="swal2-input" placeholder="Tambahkan keterangan (opsional)">
    `,
        text: text,
        icon: icon,
        showCancelButton: true, // Tombol "Batal"
        confirmButtonColor: "#3085d6",
        confirmButtonText: confirmButtonText,
        showDenyButton: true, // Tombol "Tolak"
        denyButtonText: denyButtonText,
        denyButtonColor: "#000000",
        cancelButtonColor: "#d33",
        cancelButtonText: cancelButtonText,
        preConfirm: () => {
            // Ambil nilai dari input keterangan
            const keterangan = (Swal.getPopup()?.querySelector('#swal-input-keterangan') as HTMLInputElement)?.value;
            // Kembalikan objek dengan nilai keterangan
            return { keterangan: keterangan || undefined }; // Menggunakan undefined jika input kosong
        },
        preDeny: () => {
            const keterangan = (Swal.getPopup()?.querySelector('#swal-input-keterangan') as HTMLInputElement)?.value;
            // Mengembalikan Promise juga di preDeny agar loader tampil
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({ keterangan: keterangan || undefined });
                }, 500); // Penundaan singkat untuk melihat loader
            });
        }
    });
}