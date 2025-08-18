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
    rowSpan2Cell: {
        height: 50, // Sesuaikan tinggi ini agar sama dengan total 2 baris header lainnya
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
            <View style={[styles.tableColHeader, styles.tableCellCenter, styles.col1, styles.colBorderRight, styles.colBorderBottom, styles.rowSpan2Cell]}>
                <Text style={styles.tableCell}>No</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom, styles.rowSpan2Cell]}>
                <Text style={styles.tableCell}>Pemilik Risiko</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom, styles.rowSpan2Cell]}>
                <Text style={styles.tableCell}>Tahap Proses Bisnis</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col2, styles.colBorderRight, styles.colBorderBottom, styles.rowSpan2Cell]}>
                <Text style={styles.tableCell}>ID Risiko</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom, styles.rowSpan2Cell]}>
                <Text style={styles.tableCell}>Sasaran Proses Bisnis</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom, styles.rowSpan2Cell]}>
                <Text style={styles.tableCell}>Program Unit Kerja</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom, styles.rowSpan2Cell]}>
                <Text style={styles.tableCell}>Nama Risiko Fraud</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom, styles.rowSpan2Cell]}>
                <Text style={styles.tableCell}>Jenis Risiko</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom, styles.rowSpan2Cell]}>
                <Text style={styles.tableCell}>Kemungkinan Skenario Kecurangan</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom, styles.rowSpan2Cell]}>
                <Text style={styles.tableCell}>Gejala / Indikasi</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom, styles.rowSpan2Cell]}>
                <Text style={styles.tableCell}>Kemungkinan Pihak Terkait</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom, styles.rowSpan2Cell]}>
                <Text style={styles.tableCell}>Penyebab</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom, styles.rowSpan2Cell]}>
                <Text style={styles.tableCell}>Akibat</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom, styles.rowSpan2Cell]}>
                <Text style={styles.tableCell}>Existing Control / Internal Control</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom, styles.rowSpan2Cell]}>
                <Text style={styles.tableCell}>Jenis Perlakuan Risiko</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom, styles.rowSpan2Cell]}>
                <Text style={styles.tableCell}>Rencana Perlakuan Risiko</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom, styles.rowSpan2Cell]}>
                <Text style={styles.tableCell}>Biaya Perlakuan Risiko</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom, styles.rowSpan2Cell]}>
                <Text style={styles.tableCell}>Target Waktu Rencana Perlakuan Risiko</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom, styles.rowSpan2Cell]}>
                <Text style={styles.tableCell}>Penanggung Jawab (PIC)</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom, styles.rowSpan2Cell]}>
                <Text style={styles.tableCell}>Dampak</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom, styles.rowSpan2Cell]}>
                <Text style={styles.tableCell}>Kemungkinan</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight, styles.colBorderBottom, styles.rowSpan2Cell]}>
                <Text style={styles.tableCell}>Tingkat Risiko</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderBottom, styles.rowSpan2Cell]}>
                <Text style={styles.tableCell}>Level Risiko</Text>
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
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>11</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>12</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>13</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>14</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>15</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>16</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>17</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>18</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>19</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>20</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>21</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>22</Text>
            </View>
            <View style={[styles.tableColHeader, styles.col3]}>
                <Text style={styles.tableCell}>23</Text>
            </View>
        </View>
    </View>
);

export default TheadTable;