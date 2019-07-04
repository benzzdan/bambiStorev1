import React, { Component } from 'react';


class MobileNav extends Component {
    componentDidMount() {
        var elem = document.querySelector(".sidenav");
        var instance = M.Sidenav.init(elem, {
            edge: "left",
            inDuration: 250
        });
    }

    render() {
        return (
            <div>
                <nav className="hide-on-large-only">
                    <div className="nav-wrapper">
                        <a href="#!" className="brand-logo">Logo</a>
                        <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <ul className="right hide-on-med-and-down">
                            <li><a href="sass.html">Sass</a></li>
                            <li><a href="badges.html">Components</a></li>
                            <li><a href="collapsible.html">Javascript</a></li>
                            <li><a href="mobile.html">Mobile</a></li>
                        </ul>
                    </div>
                </nav>

                <ul className="sidenav" id="mobile-demo">
                    <li><a href="sass.html">Sass</a></li>
                    <li><a href="badges.html">Components</a></li>
                    <li><a href="collapsible.html">Javascript</a></li>
                    <li><a href="mobile.html">Mobile</a></li>
                </ul>

            </div>
        );
    }
}

export default MobileNav;
// const MobileNav = () => (
//     <div>
//         <nav className="hide-on-large-only">
//             <div className="nav-wrapper">
//                 <a href="#!" className="brand-logo">Logo</a>
//                 <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
//                 <ul className="right hide-on-med-and-down">
//                     <li><a href="sass.html">Sass</a></li>
//                     <li><a href="badges.html">Components</a></li>
//                     <li><a href="collapsible.html">Javascript</a></li>
//                     <li><a href="mobile.html">Mobile</a></li>
//                 </ul>
//             </div>
//         </nav>

//         <ul className="sidenav" id="mobile-demo">
//             <li><a href="sass.html">Sass</a></li>
//             <li><a href="badges.html">Components</a></li>
//             <li><a href="collapsible.html">Javascript</a></li>
//             <li><a href="mobile.html">Mobile</a></li>
//         </ul>

//     </div>
// );


// export default MobileNav;