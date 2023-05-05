import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';

import { httpClient } from '../lib/axios';

interface Product {
  id: number
  name: string
  description: string
  price: number
}

export function ProductInfo({ route, navigation }: any) {
  const [productInfo, setProductInfo] = useState({} as Product)
  const [isFetchingProduct, setIsFetchingProduct] = useState(true);

  const { id: productId } = route.params

  async function getProductInfo() {
    try {
      const { data } = await httpClient.get('/products')
      const newData = data.find((item: Product) => item.id === productId) ?? {}

      setProductInfo(newData)
    } catch (err) {
      setProductInfo({} as Product)
      console.log('err', err)
    } finally {
      setIsFetchingProduct(false)
    }
  }

  function handleBuyProduct() {
    Alert.alert('Produto comprado com sucesso!')
    navigation.navigate('Home')
  }

  useEffect(() => {
    getProductInfo()
  }, [productId])

  if (isFetchingProduct) return <Text>Carregando produto...</Text>;

  return (
    <View>
       <Text>{productInfo.name}</Text>
       <TouchableOpacity onPress={handleBuyProduct}>
        <Text>Comprar</Text>
       </TouchableOpacity>
    </View>
  )
}
