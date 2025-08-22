import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { IdentifikasiFraudValue } from '@/app/types';

interface TableIdentifikasi {
    data: IdentifikasiFraudValue;
    index: number;
}

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
    },

    // --- Gaya Tabel Umum ---
    table: {
        width: 'auto',
        borderLeft: 1,
        borderRight: 1,
        borderTop: 1,
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'stretch', // Pastikan sel mengisi tinggi baris
    },
    tableCol: {
        justifyContent: 'center', // Center content vertically
        alignItems: 'flex-start', // Default align text to start
        padding: 5
    },
    colBorderRight: {
        borderRightWidth: 1,
    },
    colBorderBottom: {
        borderBottom: 1,
    },
    font11: {
        fontSize: 11, // Ukuran font untuk konten sel
    },
    font9: {
        fontSize: 9,
    },
    textStart: {
        textAlign: 'left'
    },

    // --- Lebar Kolom Spesifik ---
    col1: { width: '5%' },   // No
    col2: { width: '10%' },  // Rencana Kinerja
    col3: { width: '15%' },  // Sasaran Kinerja
});

// Komponen Tabel
const TableIdentifikasi: React.FC<TableIdentifikasi> = ({ data, index }) => (
    <View style={styles.table}>
        {/* Baris Data 1 */}
        <View style={[styles.tableRow, styles.colBorderBottom]}>
            <View style={[styles.tableCol, styles.col1, styles.colBorderRight, styles.textStart]}>
                <Text style={styles.font11}>{index}</Text>
            </View>
            <View style={[styles.tableCol, styles.col3, styles.colBorderRight]}>
                <Text style={styles.font11}>{data.nama_pegawai || "-"}</Text>
            </View>
            <View style={[styles.tableCol, styles.col3, styles.colBorderRight]}>
                <Text style={styles.font11}>{data.nama_rencana_kinerja || "-"}</Text>
            </View>
            {/* <View style={[styles.tableCol, styles.col3, styles.colBorderRight]}>
                <Text style={styles.font9}>{data.id_rencana_kinerja || "-"}</Text>
            </View> */}
            <View style={[styles.tableCol, styles.col3, styles.colBorderRight]}>
                <Text style={styles.font11}>Bappeda</Text>
            </View>
            <View style={[styles.tableCol, styles.col3, styles.colBorderRight]}>
                <Text style={styles.font11}>{data.nama_risiko || "-"}</Text>
            </View>
            <View style={[styles.tableCol, styles.col3, styles.colBorderRight]}>
                <Text style={styles.font11}>{data.jenis_risiko || "-"}</Text>
            </View>
            <View style={[styles.tableCol, styles.col3, styles.colBorderRight]}>
                <Text style={styles.font11}>{data.kemungkinan_kecurangan || "-"}</Text>
            </View>
            <View style={[styles.tableCol, styles.col3, styles.colBorderRight]}>
                <Text style={styles.font11}>{data.indikasi || "-"}</Text>
            </View>
            <View style={[styles.tableCol, styles.col3]}>
                <Text style={styles.font11}>{data.kemungkinan_pihak_terkait || "-"}</Text>
            </View>
        </View>
    </View>
);

export default TableIdentifikasi;