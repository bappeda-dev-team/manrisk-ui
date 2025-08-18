'use client'

import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import TablePemda from '../components/TablePemda';
import TableAnalisa from '../components/TableAnalisa';
import TTD from '../components/TandaTangan';
import { Font } from '@react-pdf/renderer';
import TheadTable from '../components/TheadTable';


Font.register({ family: 'Times-Roman', src: '/font/times.ttf', fontStyle: 'normal', fontWeight: 'normal' });

interface DocumentProps {
    branding: any;
}

// Gaya untuk MyDocument
const styles = StyleSheet.create({
    page: {
        paddingVertical: 30, // px-20
        paddingHorizontal: 38, // py-5
        fontFamily: "Times-Roman",
        textAlign: 'justify'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center', // Untuk centering horizontal teks
    },
    logoContainer: {
        marginBottom: 20, // Spasi bawah logo
        alignItems: 'center',
    },
    heading: {
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginBottom: 20, // py-5
    },
    headingBr: {
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    paragraph: {
        fontSize: 11,
        marginBottom: 10,
        lineHeight: 1.5,
    },
    boldText: {
        fontWeight: 'bold',
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4, // equivalent to Tailwind's gap-1, though you might need to adjust spacing manually or use margins
    },
    marginTop: {
        marginTop: 10, // equivalent to Tailwind's mt-4
    },
    logoImage: {
        width: 60,
        objectFit: 'contain'
    },
    tandaTangan: {
        flexDirection: 'row',       // Mengatur item (TTD components) untuk berjajar secara horizontal
        justifyContent: 'space-evenly', // Mendistribusikan ruang kosong secara merata di antara dan di sekitar item
        alignItems: 'flex-start',   // Opsional: mengatur item untuk rata di bagian atas (atau 'center', 'flex-end')
        width: '100%',              // Pastikan kontainer mengambil lebar penuh agar justifyContent berfungsi
    },
});


const Kertas: React.FC<DocumentProps> = ({ branding }) => {

    if (branding.logo === '' || branding.logo === undefined) {
        return (
            <h1>logo tidak di temukan di provider</h1>
        )
    } else if (branding.tahun === null || branding.tahun === undefined) {
        return (
            <h1>Tahun tidak di temukan di provider</h1>
        )
    }

    const imageUrl = branding?.logo;

    return (
        <Document>
            <Page size="A4" style={styles.page} orientation='landscape'>
                <Text style={styles.headingBr}>
                    KERTAS KERJA MANAJEMEN RISIKO KECURANGAN (FRAUD)
                </Text>
                <Text style={styles.heading}>
                    ANALISA RISIKO
                </Text>
                <TablePemda />
                <TheadTable />
                <TableAnalisa />
                <TTD
                    pihak='Kepala Badan Perencanaan Penelitian dan Pengembangan'
                    nama='Akun Test Level 1'
                    nip='019284098130948'
                    tanggal
                />
            </Page>
        </Document>
    );
}

export default Kertas;