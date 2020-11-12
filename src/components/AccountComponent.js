import React from 'react';
import Table from 'react-bootstrap/Table'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Link from '@material-ui/core/Link';
import ApiService from "../services/ApiService";
import SearchComponent from "./SearchComponent";
import RefreshComponent from "./RefreshComponent";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";


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
                <h3>Mein Bestand auf <Link href={`https://sandbox.cardmarket.com/en/Magic/Users/${this.state.account.userName}`}>cardmarket.com</Link></h3>
                <Accordion expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <h3>Mein Account</h3>
                </AccordionSummary>
                <AccordionDetails>
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
                </AccordionDetails>
              </Accordion>
                <SearchComponent/>
                <RefreshComponent account={this.state.account}/>
            </div>
        )
    }
}

export default AccountComponent