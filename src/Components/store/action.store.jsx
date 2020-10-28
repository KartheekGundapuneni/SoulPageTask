export const REPOSITORY = 'REPOSITORY';
export const CONTRIBUTORS = 'CONTRIBUTORS';
export function  getFavouriteRepository (favRepo) {
        return async (dispatch) => {
        await dispatch(FavRepo(favRepo))
    }
}

export const FavRepo = (favRepo) => ({
    type : REPOSITORY,
    favRepo  
})

export const setContributorsList = (contri) => {
    return {
        type : CONTRIBUTORS,
        data : contri
    }
}