import React from 'react';
import Table from 'react-bootstrap/Table'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Link from '@material-ui/core/Link';
import ApiService from "../services/ApiService";
import SearchComponent from "./SearchComponent";
import RefreshComponent from "./RefreshComponent";


class AccountComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: null,
            account: {}
        }
    }

     handleChange = panel => (event, expanded) => {
        this.setState({
          expanded: expanded ? panel : false,
        });
      };

    componentDidMount() {
        ApiService.getAccountInformation().then((response) => {
            this.setState({account: response.data})
        });
    }

//https://v3.material-ui.com/demos/expansion-panels/
    render() {
        const { expanded } = this.state;

        return (
            <div>
                <h3>Mein Bestand auf <Link href={`https://sandbox.cardmarket.com/en/Magic/Users/${this.state.account.userName}`} activeClassName="current">cardmarket.com</Link></h3>
                <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                          <td colSpan="2"><h3>Mein Account</h3></td>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                   <Table striped bordered hover variant="dark">
                      <tbody className="text-center">
                             <tr>
                                 <td>Account Id</td>
                                 <td>{this.state.account.userId}</td>
                             </tr>
                             <tr>
                                 <td>Username</td>
                                 <td>{this.state.account.userName}</td>
                             </tr>
                             <tr>
                                 <td>Registration Date</td>
                                 <td>{this.state.account.registrationDate}</td>
                             </tr>
                             <tr>
                                 <td>UserType</td>
                                 <td>{this.state.account.userType}</td>
                             </tr>
                             <tr>
                                 <td>First Name</td>
                                 <td>{this.state.account.firstName}</td>
                             </tr>
                             <tr>
                                 <td>Last Name</td>
                                 <td>{this.state.account.lastName}</td>
                             </tr>
                             <tr>
                                 <td>Total Balance</td>
                                 <td>{this.state.account.totalBalance}</td>
                             </tr>
                       </tbody>
                  </Table>
                </ExpansionPanelDetails>
              </ExpansionPanel>
                <SearchComponent/>
                <RefreshComponent account={this.state.account}/>
            </div>
        )
    }
}

export default AccountComponent