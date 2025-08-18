import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

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
    tableColHeader: {
        padding: 2,
        backgroundColor: 'white', // Latar belakang abu-abu untuk header
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
    },
    colBorderRight: {
        borderRightWidth: 1,
    },
    colBorderBottom: {
        borderBottom: 1,
    },
    tableCell: {
        fontSize: 11, // Ukuran font untuk konten sel
    },
    tableCellCenter: {
        textAlign: 'center', // Untuk sel yang teksnya di tengah
    },

    // --- Lebar Kolom Spesifik ---
    col1: { width: '5%' },   // No
    col2: { width: '10%' },  // Rencana Kinerja
    col3: { width: '15%' },  // Sasaran Kinerja
});

// Komponen Tabel
const TheadTable = () => (
    <View style={styles.table}>
        {/* Header Tabel */}
        <View style={styles.tableRow}>
            <View style={[styles.tableColHeader, styles.tableCellCenter, styles.col1, styles.colBorderRight, styles.colBorderBottom]}>
                <Text style={styles.tableCell}>No</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom]}>
                <Text style={styles.tableCell}>Pemilik Risiko</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom]}>
                <Text style={styles.tableCell}>Risiko Kecurangan yang di Mitigasi</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col2, styles.colBorderRight, styles.colBorderBottom]}>
                <Text style={styles.tableCell}>Bentuk Kegiatan Pengendalian</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom]}>
                <Text style={styles.tableCell}>Penanggung Jawab (PIC)</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom]}>
                <Text style={styles.tableCell}>Rencana Waktu Pelaksanaan Risiko</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom]}>
                <Text style={styles.tableCell}>Realisasi Waktu Pelaksanaan Perlakuan Risiko</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom]}>
                <Text style={styles.tableCell}>Progres Tindak Lanjut (%)</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom]}>
                <Text style={styles.tableCell}>Bukti Pelaksanaan Tindak Lanjut</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom]}>
                <Text style={styles.tableCell}>Kendala</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderBottom]}>
                <Text style={styles.tableCell}>Catatan</Text>
            </View>
        </View>
        {/* NUMBER HEADER ROW */}
        <View style={styles.tableRow}>
            <View style={[styles.tableColHeader, styles.tableCellCenter, styles.col1, styles.colBorderRight]}>
                <Text style={styles.tableCell}>1</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>2</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>3</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col2, styles.colBorderRight]}>
                <Text style={styles.tableCell}>4</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>5</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>6</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>7</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>8</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>9</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>10</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3]}>
                <Text style={styles.tableCell}>11</Text>
            </View>
        </View>
    </View>
);

export default TheadTable;