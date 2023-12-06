export async function retrieveItems(url, items=[], maxitems= null){
    if (maxitems!=null && items.length>=maxitems){
        return items
    }
    console.log('fetching', url)
    const newData = await fetch(url)
    const data = await newData.json()
    console.log('fetch results', data)
    if (data['@iot.nextLink']!=null){
        return retrieveItems(data['@iot.nextLink'], items.concat(data.value), maxitems)
    }else{
        return items.concat(data.value)
    }
}