import React, {Component} from 'react';
import './dropDownList.css';
import SelectedValueComponent from './selectedValue'

class DropDownList extends Component{

    state = {
        showDropDownDiv : false,
        masterList : [
            {
                img: "https://guesseu.scene7.com/is/image/GuessEU/M63H24W7JF0-L302-ALTGHOST?wid=1500&fmt=jpeg&qlt=80&op_sharpen=0&op_usm=1.0,1.0,5,0&iccEmbed=0",
                listValue: "CHECK PRINT SHIRT",
                key:1
            },
            {
                img: "https://guesseu.scene7.com/is/image/GuessEU/FLGLO4FAL12-BEIBR?wid=700&amp;fmt=jpeg&amp;qlt=80&amp;op_sharpen=0&amp;op_usm=1.0,1.0,5,0&amp;iccEmbed=0",
                listValue: "HIGH LOGO SNEAKER",
                key:2
            },
            {
                img: "https://guesseu.scene7.com/is/image/GuessEU/HWVG6216060-TAN?wid=700&amp;fmt=jpeg&amp;qlt=80&amp;op_sharpen=0&amp;op_usm=1.0,1.0,5,0&amp;iccEmbed=0",
                listValue: "CATE RIGID BAG",
                key:3
            },
            {
                img: "http://guesseu.scene7.com/is/image/GuessEU/WC0001FMSWC-G5?wid=520&fmt=jpeg&qlt=80&op_sharpen=0&op_usm=1.0,1.0,5,0&iccEmbed=0",
                listValue: "GUESS CONNECT WATCH",
                key:4
            },
            {
                img: "https://guesseu.scene7.com/is/image/GuessEU/AW6308VIS03-SAP?wid=700&amp;fmt=jpeg&amp;qlt=80&amp;op_sharpen=0&amp;op_usm=1.0,1.0,5,0&amp;iccEmbed=0",
                listValue: "'70s RETRO GLAM KEFIAH",
                key:5
            }
        ],
        filteredList : [
            {
                img: "https://guesseu.scene7.com/is/image/GuessEU/M63H24W7JF0-L302-ALTGHOST?wid=1500&fmt=jpeg&qlt=80&op_sharpen=0&op_usm=1.0,1.0,5,0&iccEmbed=0",
                listValue: "CHECK PRINT SHIRT",
                key:1
            },
            {
                img: "https://guesseu.scene7.com/is/image/GuessEU/FLGLO4FAL12-BEIBR?wid=700&amp;fmt=jpeg&amp;qlt=80&amp;op_sharpen=0&amp;op_usm=1.0,1.0,5,0&amp;iccEmbed=0",
                listValue: "HIGH LOGO SNEAKER",
                key:2
            },
            {
                img: "https://guesseu.scene7.com/is/image/GuessEU/HWVG6216060-TAN?wid=700&amp;fmt=jpeg&amp;qlt=80&amp;op_sharpen=0&amp;op_usm=1.0,1.0,5,0&amp;iccEmbed=0",
                listValue: "CATE RIGID BAG",
                key:3
            },
            {
                img: "http://guesseu.scene7.com/is/image/GuessEU/WC0001FMSWC-G5?wid=520&fmt=jpeg&qlt=80&op_sharpen=0&op_usm=1.0,1.0,5,0&iccEmbed=0",
                listValue: "GUESS CONNECT WATCH",
                key:4
            },
            {
                img: "https://guesseu.scene7.com/is/image/GuessEU/AW6308VIS03-SAP?wid=700&amp;fmt=jpeg&amp;qlt=80&amp;op_sharpen=0&amp;op_usm=1.0,1.0,5,0&amp;iccEmbed=0",
                listValue: "'70s RETRO GLAM KEFIAH",
                key:5
            }
        ],
        selectedList : []
    }

    toggleDiv = () => {
        this.setState({
            showDropDownDiv : !this.state.showDropDownDiv
        })
    }

    valueSelected = (dropDownSelectedId) =>{
        let selectedList = this.state.masterList.filter(el => {
            return el.key === dropDownSelectedId
        })

        const indexOfSelectedItem = this.state.masterList.indexOf(selectedList[0]);
        let modifiedMasterList = this.state.masterList;
        let modifiedSelectedList = this.state.selectedList;
        modifiedSelectedList.push(selectedList[0]);
        modifiedMasterList.splice(indexOfSelectedItem,1);
        
        this.setState({
            masterList : modifiedMasterList,
            selectedList : modifiedSelectedList,
            filteredList : modifiedMasterList
        });
        //console.log("selectedlist",this.state.selectedList);
    }

    valueRemoved = (dropDownRemovedId) =>{
        let removedList = this.state.selectedList.filter(el => {
            return el.key === dropDownRemovedId
        })

        const indexOfRemovedItem = this.state.selectedList.indexOf(removedList[0]);
        let modifiedMasterList = this.state.masterList;
        let modifiedSelectedList = this.state.selectedList;
        modifiedSelectedList.splice(indexOfRemovedItem,1);
        modifiedMasterList.push(removedList[0]);
        
        this.setState({
            masterList : modifiedMasterList,
            selectedList : modifiedSelectedList,
            filteredList : modifiedMasterList
        });
    }

    filterList = (event) => {
        let filterListModified = this.state.masterList.filter(el => el.listValue.toLowerCase().indexOf(event.target.value)>-1);
        console.log("filtered list",event.target.value);
        this.setState({
            filteredList : filterListModified
        })
    }

    render(){
        let divDropDownList = null;
        if(this.state.showDropDownDiv && this.state.filteredList.length!=0){
            divDropDownList = (
                <div className='ddl'>
                <ul style={{listStyle: "none"}}>
                     {this.state.filteredList.map(el => {
                        return (
                            <li key={el.key} 
                            onClick = {() => this.valueSelected(el.key)}>
                                <span><img src={el.img} alt="Person" width="96" height="96"/>{el.listValue}</span>
                            </li>
                            )
                     })}
                     </ul>
                </div>
            );
            
        }
        let selectedItemsDiv = null;
        if(this.state.selectedList.length != 0){
            selectedItemsDiv = (
                <div className='selectedValues'>
                    {
                        this.state.selectedList.map(el => {
                                //console.log(el)
                                return (<SelectedValueComponent listItem={el} cancelClick = {this.valueRemoved}/>)
                            }
                        )
                    }
                </div>
            );
        }

        return (
            <div style={{borderBottom : "1px solid blue",display: "flex", flexWrap: "wrap", maxWidth: "800px", margin: "0 auto"}}>
                {selectedItemsDiv}
                <div style={{display : 'inline',position:'relative'}}>
                    <input type='text' onClick={this.toggleDiv} placeHolder='Search Here' onChange={this.filterList}/>
                    {divDropDownList}
                </div>
            </div>
        )
    }



}

export default DropDownList;