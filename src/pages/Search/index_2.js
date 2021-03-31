import React,{ useState} from 'react'
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Keyboard} from 'react-native'

import { Feather} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'

import api, {key} from '../../services/api'
import { Conditions } from '../../components/Conditions'

export default function Search(){
    const navigation = useNavigation()

    const [input, setInput] = useState('')
    const [city, setCity] = useState(null)
    const [error, setError] = useState(null)
    const [icon, setIcon] = useState({name: 'cloud', color: '#FFF'})
    const [background, setBackground] = useState(['#1ed6ff','#97c1ff'])

    async function handleSearch(){
        //weather?key=da680824&city_name=Campinas,SP
        const response = await api.get(`/weather?key=${key}&city_name=${input}`)
        console.log(response.data)
        if (response.data.by === 'default'){
            setError('Atenção: Cidade não encontrada!')
            setInput('')
            setCity(null)
            Keyboard.dismiss()
            return
        }
        console.log("CITY===========================================================")
        setCity(response.data)
        console.log(city)

        if (response.data.results.currenty === 'noite'){
            setBackground(['#0c3741','#0f2f61'])
        }

        switch(response.data.results.condition_slug){
            case 'clear_day':
                setIcon({name: 'sunny-outline', color: '#FFB300'})
                break
            case 'rain':
                setIcon({name: 'rainy-outline', color: '#FFF'})
                break
            case 'storm':
                setIcon({name: 'thunderstorm-outline', color: '#FFF'})
                break
        }
        setInput('')
        setError(null)
        Keyboard.dismiss()
        if(response.data){
            return(
                <SafeAreaView style={styles.container}>
                    <TouchableOpacity style={styles.backButton} onPress={ () => navigation.navigate('Home')}>
                        <Feather
                        name="chevron-left"
                        size={32}
                        color="#000"
                        />
                        <Text style={{ fontSize: 22}}>Voltar</Text>
                    </TouchableOpacity>
                    <View style={styles.searchBox}>
                        <TextInput
                            value={input}
                            onChangeText={ (valor) => setInput(valor)}
                            placeholder="Ex: São Paulo, SP"
                            style={styles.input}
                        />
                        <TouchableOpacity style={styles.icon} onPress={handleSearch}>
                            <Feather
                                name="search"
                                size={22}
                                color="#FFF"
                            />
                        </TouchableOpacity>
                    </View>

                    <LinearGradient
                    style={styles.header}
                    colors={['#0c3741','#0f2f61']}
                    >
                        <Text style={styles.date}>{city.results.date}</Text>
                        <Text style={styles.city}>{city.results.city_name}</Text>
                        <View>
                            <Text style={styles.temp}>{city.results.temp}°</Text>
                        </View>
                        <Conditions weather={city} />
                    </LinearGradient>
                </SafeAreaView>
            )
        }

    }

    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={ () => navigation.navigate('Home')}>
                <Feather
                name="chevron-left"
                size={32}
                color="#000"
                />
                <Text style={{ fontSize: 22}}>Voltar</Text>
            </TouchableOpacity>
            <View style={styles.searchBox}>
                <TextInput
                    value={input}
                    onChangeText={ (valor) => setInput(valor)}
                    placeholder="Ex: São Paulo, SP"
                    style={styles.input}
                />
                <TouchableOpacity style={styles.icon} onPress={handleSearch}>
                    <Feather
                        name="search"
                        size={22}
                        color="#FFF"
                    />
                </TouchableOpacity>
            </View>

            {error && <Text style={{marginTop: 25, fontSize: 18, color: 'red'}}>{error}</Text>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        paddingTop: '10%',
        backgroundColor: '#e8f0ff'
    },
    backButton:{
        flexDirection: 'row',
        marginLeft: 15,
        alignSelf: 'flex-start',
        alignItems: 'center',
        marginBottom: 10,
    },
    searchBox:{
        alignItems:'center',
        flexDirection: 'row',
        backgroundColor: '#DDD',
        width: '90%',
        height: 50,
        borderRadius: 8
    },
    input:{
        width: '85%',
        height: 50,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        padding: 7
    },
    icon:{
        width: '15%',
        backgroundColor: '#1ED6FF',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    }
})