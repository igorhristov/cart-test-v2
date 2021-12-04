export const checkExisting = (products, catProducts) => {
    const getCat = catProducts[0].category
    const existCategory = products.find(product=>product.category === getCat)
    if(existCategory) {
        return 
    }
}