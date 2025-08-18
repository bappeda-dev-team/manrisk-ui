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
    tableCell: {
        fontSize: 11, // Ukuran font untuk konten sel
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
const TableAllData = () => (
    <View style={styles.table}>
        {/* Baris Data 1 */}
        <View style={[styles.tableRow, styles.colBorderBottom]}>
            <View style={[styles.tableCol, styles.col1, styles.colBorderRight, styles.textStart]}>
                <Text style={styles.tableCell}>1</Text>
            </View>
            <View style={[styles.tableCol, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>Akun Test Level 3</Text>
            </View>
            <View style={[styles.tableCol, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>Contoh data</Text>
            </View>
            <View style={[styles.tableCol, styles.col2, styles.colBorderRight]}>
                <Text style={styles.tableCell}>contoh data</Text>
            </View>
            <View style={[styles.tableCol, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>contoh data</Text>
            </View>
            <View style={[styles.tableCol, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>contoh data</Text>
            </View>
            <View style={[styles.tableCol, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>contoh data</Text>
            </View>
            <View style={[styles.tableCol, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>contoh data</Text>
            </View>
            <View style={[styles.tableCol, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>contoh data</Text>
            </View>
            <View style={[styles.tableCol, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>contoh data</Text>
            </View>
            <View style={[styles.tableCol, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>contoh data</Text>
            </View>
            <View style={[styles.tableCol, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>contoh data</Text>
            </View>
            <View style={[styles.tableCol, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>contoh data</Text>
            </View>
            <View style={[styles.tableCol, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>contoh data</Text>
            </View>
            <View style={[styles.tableCol, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>contoh data</Text>
            </View>
            <View style={[styles.tableCol, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>contoh data</Text>
            </View>
            <View style={[styles.tableCol, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>contoh data</Text>
            </View>
            <View style={[styles.tableCol, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>contoh data</Text>
            </View>
            <View style={[styles.tableCol, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>contoh data</Text>
            </View>
            <View style={[styles.tableCol, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>contoh data</Text>
            </View>
            <View style={[styles.tableCol, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>contoh data</Text>
            </View>
            <View style={[styles.tableCol, styles.col3, styles.colBorderRight]}>
                <Text style={styles.tableCell}>contoh data</Text>
            </View>
            <View style={[styles.tableCol, styles.col3]}>
                <Text style={styles.tableCell}>Bappeda</Text>
            </View>
        </View>
    </View>
);

export default TableAllData;