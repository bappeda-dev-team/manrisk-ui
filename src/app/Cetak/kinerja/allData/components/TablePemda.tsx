import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
    },

    // --- Gaya Tabel Umum ---
    table: {
        width: 'auto',
        marginBottom: 20
    },
    tableRow: {
        flexDirection: 'row',
    },
    textStart: {
        textAlign: 'left'
    },
    fontSize11: {
        fontSize: 11, // Ukuran font untuk konten sel
    },
    textBold: {
        fontWeight: 'bold'
    },
    // --- Lebar Kolom Spesifik ---
    col: { width: '2%' },   // No
    col1: { width: '5%' },   // No
    col2: { width: '70%' },  // Rencana Kinerja
    col3: { width: '12%' },  // Sasaran Kinerja
});

// Komponen Tabel
const TablePemda = () => (
    <View style={styles.table}>
        {/* Baris Data 1 */}
        <View style={[styles.tableRow, styles.textStart, styles.fontSize11, styles.textBold]}>
            <View style={[ styles.col3, styles.textStart]}>
                <Text style={[styles.textStart]}>Nama Pemda</Text>
            </View>
            <View style={[ styles.col, styles.textStart]}>
                <Text style={[styles.textStart]}>:</Text>
            </View>
            <View style={[ styles.col2, styles.textStart]}>
                <Text style={[styles.textStart, styles.textStart]}>Kota Madiun</Text>
            </View>
        </View>
        {/* Baris Data 2 */}
        <View style={[styles.tableRow, styles.textStart, styles.fontSize11, styles.textBold]}>
            <View style={[ styles.col3, styles.textStart]}>
                <Text style={[styles.textStart]}>Unit Kerja</Text>
            </View>
            <View style={[ styles.col, styles.textStart]}>
                <Text style={[styles.textStart]}>:</Text>
            </View>
            <View style={[ styles.col2, styles.textStart]}>
                <Text style={[styles.textStart, styles.textStart]}>Badan Perencanaan Penelitian dan Pengembangan Kota Madiun</Text>
            </View>
        </View>
        {/* Baris Data 3 */}
        <View style={[styles.tableRow, styles.textStart, styles.fontSize11, styles.textBold]}>
            <View style={[ styles.col3, styles.textStart]}>
                <Text style={[styles.textStart]}>Tahun Penilaian</Text>
            </View>
            <View style={[ styles.col, styles.textStart]}>
                <Text style={[styles.textStart]}>:</Text>
            </View>
            <View style={[ styles.col2, styles.textStart]}>
                <Text style={[styles.textStart, styles.textStart]}>2025</Text>
            </View>
        </View>
    </View>
);

export default TablePemda;