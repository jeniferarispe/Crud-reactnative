import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native"

interface InputProps extends TextInputProps {
    label?: string
    error?: string
}

export const Input = (props: InputProps) => {
    return <View style={styles.container}>
        {props.label && <Text style={styles.label}>{props.label}</Text>}
        <TextInput
            style={[styles.input, props.error && { borderColor: 'red' }]}
            {...props}
        />
        {props.error && <Text style={styles.error}>{props.error}</Text>}
    </View>
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        padding:5
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 1,
        paddingVertical: 1,
        borderRadius: 10,
        marginTop: 2,
        height:40,
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    error: {
        color: 'red',
        fontSize: 12
    }
})