import { Header } from "@components/Header";
import { Container, Content, Icon } from "./styles";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { AppError } from "@utils/AppError";

import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { groupCreate } from "@storage/group/groupCreate";
import { Alert } from 'react-native';

export function NewGroup() {

    const [group, setGroup] = useState('');

    const navigation = useNavigation();

    async function handleNew(){
        try{
            if(group.trim().length === 0){
                return Alert.alert('Novo Grupo', 'Informe o nome da truma.');
            }

            await groupCreate(group);
            navigation.navigate('players', { group });
        } catch(error){
            if(error instanceof AppError){
                Alert.alert('Novo Grupo', error.message);
            }else{
                Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo.');
            }
        }

    }

    return(
        <Container>
            <Header showBackButton />

            <Content>
                <Icon/>

                <Highlight
                   title="Nova turma"
                   subtitle="crie uma nova turma para adicionar as pessoas"
                />

                <Input 
                    placeholder="Nome da turma"
                    onChangeText={text => setGroup(text)}
                />

                <Button
                    title="Criar"
                    style={{marginTop: 20}}
                    onPress={handleNew}
                />
            </Content>
        </Container>
    );
}