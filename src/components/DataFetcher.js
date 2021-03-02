function DataFetcher(func, stateSetter, funcParams=null, responseProperties=[]) {
    if (funcParams != null) {
        func(funcParams)
        .then((response) => {
            if (response) {
                let data = response
                for (let i = 0, l = responseProperties.length; i < l; i++) {
                    data = data[responseProperties[i]] 
                }

                stateSetter(data)
            } 
        })
    } else {
        func()
        .then((response) => {
            if (response) {
                let data = response
                for (let i = 0, l = responseProperties.length; i < l; i++) {
                    data = data[responseProperties[i]] 
                }

                stateSetter(data)
            } 
        })
    }
}

export default DataFetcher