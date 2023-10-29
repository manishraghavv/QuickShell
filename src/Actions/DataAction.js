import axios from 'axios';

export const fetchAllData = () => async (dispatch) => {
    try {
        dispatch({ type: 'DATA_REQUEST' })

        const { data } = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment");


        let tickets = []
        
        data.tickets.forEach((v,i,a) => {
            let user = data.users.filter((u) => {
                return u.id === v.userId
            })
            user = user.length > 0 ? user[0] : null;
            v.username = user?.name
            v.useravailable = user?.available
            tickets[i] = v
        })

        data.tickets = tickets

        dispatch({ type: 'DATA_SUCCESS', payload: data });

    } catch (error) {
        dispatch({ type: 'DATA_FAILURE' })
    }
}

export const selectData = (group, allTickets, orderValue) => async (dispatch) => {
    try {
        dispatch({ type: 'SELECT_DATA_REQUEST' })

        let user = false;
        let mySet = new Set();
        let arr = [], selectedData = [];

        if (group === 'status') {
            allTickets.forEach((elem) => {
                mySet.add(elem.status);
            })

            arr = [...mySet];


            arr.forEach((elem, index) => {
                let arr = allTickets.filter((fElem) => {
                    return elem === fElem.status;
                })

                selectedData.push({
                    [index]: {
                        title: elem,
                        value: arr
                    }
                })
            })
        } else if (group === 'user') {
            user = true;
            allTickets?.allUser?.forEach((elem, index) => {
                arr = allTickets?.allTickets?.filter((Felem) => {
                    return elem.id === Felem.userId;
                })

                // arr.forEach((e, k, nArray) => {
                //     nArray[k].user = allTickets?.allUser?.filter((u) => {
                //         return u.id === e.userId
                //     })
                // })

                selectedData.push({
                    [index]: {
                        title: elem.name,
                        value: arr
                    }
                })
            })
        } else {
            let prior_list = ["No priority", "Low", "Medium", "High", "Urgent"];

            prior_list.forEach((elem, index) => {
                arr = allTickets.filter((fElem) => {
                    return index === fElem.priority;
                })

                selectedData.push({
                    [index]: {
                        title: elem,
                        value: arr
                    }
                })
            })
        }

        if (orderValue === "title") {
            selectedData.forEach((elem, index) => {
                elem[index]?.value?.sort((a, b) => a.title.localeCompare(b.title))
            })
        }

        if (orderValue === "priority") {
            selectedData.forEach((elem, index) => {
                elem[index]?.value?.sort((a, b) => b.priority - a.priority)
            })
        }

        dispatch({ type: 'SELECT_DATA_SUCCESS', payload: { selectedData, user } });

    } catch (error) {
        dispatch({ type: 'SELECT_DATA_FAILURE', payload: error.message })
    }
}
