import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
    View, Text, Modal, Pressable, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert, Platform, AlertButton, Button, FlatList
} from 'react-native';
import MeuEstilo from '../../../meuestilo'
import { Pessoa } from '../../model/Pessoa';
import { Input } from "../../component/Input";
import meuestilo from "../../../meuestilo";
import { PessoaService } from '../../servico/PessoaService';

const ManterPessoa = () => {
    const [formPessoa, setFormPessoa] = useState<Partial<Pessoa>>({})
    const [formErrors, setErrors] = useState({})
    const [isRefreshing, setIsRefreshing] = useState(true)
    const [pessoas, setPessoas] = useState<Pessoa[]>([])

    useEffect(() => {
        const loadPessoas = async () => {
            setIsRefreshing(true)
            const result = await PessoaService.findAll()
            setPessoas(result)
            setIsRefreshing(false)
        }
        loadPessoas()
    }, [])

    const loadPessoas= async () => {
        setIsRefreshing(true)
        const result = await PessoaService.findAll()
        setPessoas(result)
        setIsRefreshing(false)
    }

    const deletePessoa = (pessoa: Pessoa) => {
        const cancelBtn: AlertButton = { text: 'Cancelar' }
        const deleteBtn: AlertButton = {
            text: 'Apagar',
            onPress: () => {
                PessoaService.delete(pessoa).then(() => loadPessoas())
            }
        }

        Alert.alert(`Apagar Pessoa"${pessoa.nome}?"`, 'Essa ação não pode ser desfeita!', [deleteBtn, cancelBtn])
    }

    const editPessoa = (pessoa: Pessoa) => {
        setFormPessoa(pessoa)
    }

    const render = ({ item }: { item:Pessoa }) => {
        return <View style={meuestilo.itemCard} key={item.id}>
            <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? '#f1f1f1' : 'transparent' }, meuestilo.listItem]}
                onLongPress={() => deletePessoa(item)}
                onPress={() => { alert(item) }}
            >
                {/* <Image source={{ uri: item.imageUri }} style={meuestilo.itemImage} /> */}
                <View>
                    <Text>ID: {item.id}</Text>
                    <Text>Nome: {item.nome}</Text>
                    <Text>Email: {item.email}</Text>
                    <Text>Idade: {item.idade.toString()}</Text>
                    <Text>Telefone: {item.telefone.toString()}</Text>
                </View>
            </Pressable>
        </View>
    }


    




    return (
        <KeyboardAvoidingView
        style={MeuEstilo.containerlistar}
        behavior="padding"
    >
        
          

          

          


            <FlatList
                data={pessoas}
                renderItem={render}
                keyExtractor={item => item.id.toString()}
                onRefresh={() => loadPessoas()}
                refreshing={isRefreshing}
            />
        </KeyboardAvoidingView>
    );
};
export default ManterPessoa

