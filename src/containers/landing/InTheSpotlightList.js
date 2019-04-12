import React, {Component} from 'react';

import config from '../../config/config';

import {fetchCategoryDetail} from '../../api/categories';

import SpotlightCard from '../../components/cards/spotlight/Card';

class InTheSpotlightList extends Component {

	constructor(props){
		super(props);
	
		this.state = {
			data:[],
			imagePrefix:props.imagePrefix,
			locked:false
		}
	}

	loadData = () => {
		Promise.all(this.props.data.map(category => fetchCategoryDetail(category.id)))
		.then(data => this.setState({data, locked:true}));
	}

	componentDidMount(){
		if (this.props.data.length > 0 && !this.state.locked){
			this.loadData();
		}
	}

	componentDidUpdate(){
		if (this.props.data.length > 0 && !this.state.locked){
			this.loadData();
		}
	}

	render(){
		return (
			<React.Fragment>
			{
				this.state.data.map(category => 
					<SpotlightCard 
						key={category.name + category.id} 
						link={'/products/category/' + category.id} 
						category={category.name} 
						text={category.custom_attributes.find(attr => attr.attribute_code === 'description').value} 
						image={config.mediaBaseURL + '/category/' + this.state.imagePrefix + '-' + category.position + '.jpg'} 
					/>
				)
			}
			</React.Fragment>
		);
	}
}

export default InTheSpotlightList;