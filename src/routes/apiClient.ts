import axios from "axios";

export const fetchData = async (key: string) => {
    const urlForChampions = 'https://damagecalculator.laurinnotemann.dev/getInitData/champs';
    const urlForItems = 'https://damagecalculator.laurinnotemann.dev/getInitData/items';

    if (key === "champs")
        return (await axios.get(urlForChampions)).data.listOfChampions
    else if (key === "items")
        return (await axios.get(urlForItems)).data.listOfItems
};