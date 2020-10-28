import * as React from 'react';
import { connect } from 'react-redux';
import Favourites from './Favourites';
import Loader from './Loader';
import * as actions from './../store/reducers.store';
import Contributors from './Contributors';
class  Repository extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            repository : [],
            loader : false,
            favouriteRepository: [],
            shoWFav : false,
            contributorsList : [],
            showContributors : false,
        }
    }
    componentDidMount () {
        this.getRepository()
    }

    getRepository = () =>{
        this.setState({loader : true})
        fetch("https://api.github.com/repositories")
            .then(response => response.json())
            .then((data) => {
                this.setState({repository : data , loader : false})
            })
            .catch(error => {
                this.setState({loader : true})
            })
    }

    contributors = (url) => {
        console.log("contributors_url")
        this.setState({loader : false});
        fetch(url)
        .then(response => response.json())
        .then((data) => {
            this.setState({contributorsList : data , loader : false, showContributors : true})
            this.props.setContributorsList(data);
        })
        .catch(error => {
            this.setState({loader : true})
        })
    }
    onCloseFav = () => {
        this.setState({shoWFav : false})
    }
    onCloseContributor = () => {
        this.setState({showContributors : false})
    }
    favourite = async (event,repo) => {
        this.setState({shoWFav : false})
        console.log("favourite",event.target.checked);
        let repos = this.state.favouriteRepository;
        if(event.target.checked){
            let findIndex = repos.findIndex(x => x.id === repo.id)
            if(findIndex === -1){
                repos.push(repo)
            }else {
                repos = repos.filter((rep,index) => index !== findIndex )
            }
        } else {
            repos = repos.filter((rep) => rep.id !== repo.id )
        }
        this.setState({favouriteRepository : repos})
        await this.props.getFavouriteRepository(repos);
    }
    showFavourite = () => {
        console.log("showFavourite");
        this.setState({shoWFav : true})
    }
    render() {
        return (
            <div className="table-view" style={{ marginTop: "20px"}}>
                {this.state.loader ? <Loader /> : ''}
                <div style={{textAlign: "right"}}>
                    <button type="button" className="btn btn-dark" onClick={()=>this.showFavourite()}>Favourite Repositories </button>
                </div>
                <div className="table-data" style={{paddingTop:"10px"}}>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Add to Favourite</th>
                                <th scope="col">S.No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Full Name</th>
                                <th scope="col">Contributors Link</th>
                                <th scope="col">Repository Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.repository ? this.state.repository.map((repo, index) => 
                                <tr key={repo.id}>
                                    <td><input type="checkbox" onClick={(event)=>this.favourite(event,repo)} /></td>
                                    <td scope="row">{index}</td>
                                    <td>{repo.name}</td>
                                    <td>{repo.full_name}</td>
                                    <td>
                                        <button  onClick={() => this.contributors(repo.contributors_url)}> <span>Click here to view Contributors</span></button>
                                    </td>
                                    <td>{repo.html_url}</td>
                                </tr>
                            ) : ''
                            }
                        </tbody>
                    </table>
                </div>
                {this.state.shoWFav ? <Favourites onCloseFav = {() => this.onCloseFav()}/> : ''}
                {this.state.showContributors ? <Contributors onCloseContributor = {() => this.onCloseContributor()}/> : ''}
            </div>
        );
    }
    
}
let mapDispatchToProps = dispatch => {
    return{
        getFavouriteRepository : (repos) => dispatch(actions.getFavouriteRepository(repos)),
        setContributorsList : (data) => dispatch(actions.setContributorsList(data)),
    }
}
export default connect (null,mapDispatchToProps)(Repository);
