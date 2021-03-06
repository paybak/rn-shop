import React from 'react';
import { StyleSheet, View, FlatList, Platform, Button, Alert } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item  } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors';
import * as productsActions  from '../../store/actions/products';

const UserProductScreen = (props) => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct',{
            productId: id
        });
    }


    const deleteHandler = (id) => {
        Alert.alert('Are you sure ?', 'Do you really want to delete this item ? ', [
            { text:'No', style:'default'}, 
            { text:'Yes', style:'destructive', onPress:() => {
                dispatch(productsActions.deleteProduct(id)); 
            }}])
    }
    return(
        <FlatList 
            data={userProducts}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {editProductHandler(itemData.item.id)}}
                >
                    <Button 
                        color={Colors.primaryColor} 
                        title="Edit" 
                        onPress={() => {
                             editProductHandler(itemData.item.id)
                        }}
                    />
                    <Button 
                        color={Colors.primaryColor} 
                        title="delete" 
                        onPress={() => {
                            deleteHandler(itemdata.item.id)}
                        }
                    />
                </ProductItem>
            )}
        />
    );
} 

UserProductScreen.navigationOptions = (navData) => {
    return{
        headerTitle:'Your Products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title="Menu"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={()=> {navData.navigation.toggleDrawer(); }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title="Add"
                    iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    onPress={()=> {navData.navigation.navigate('EditProduct'); }}
                />
            </HeaderButtons>
        )
    };
}

/* export const screenOptions = navData => {
    return {
        headerTitle: 'Your Products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Cart"
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => {
                        navData.navigation.navigate('Cart');
                    }}
                />
            </HeaderButtons>
        ),
    }
}
 */
const styles = StyleSheet.create({

})

export default UserProductScreen