import React from "react";
import "./Header.css";
import "./LoginHeader.css";
import logo from "../../images/logo.png";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import PeopleRoundedIcon from "@material-ui/icons/PeopleRounded";
import WorkRoundedIcon from "@material-ui/icons/WorkRounded";
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import ChatRoundedIcon from "@material-ui/icons/ChatRounded";
import axios from "axios";
import HeaderOption from "../HeaderOption/HeaderOption";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login, logout } from "../../features/userSlice";
import getApi from "../../utils/apis";
import { Cookies } from "js-cookie";
function Header() {
	const dispatch = useDispatch();
	const handleLogout = (e) => {
		e.preventDefault();
		let axiosConfig = {
			withCredentials: true,
		}

		// dispatch(getUser());
		// axios({
		// 	method: "get",
		// 	url: getApi("api/user/myProfile"),
		// })
		// 	.then((res) => {
		// 		dispatch(logout());
		// 		console.log(res);
		// 		Cookies.remove("access_token");
		// 	})
		// 	.catch((err) => {
		// 		alert("Internal Server Error");
		// 	});

		axios.get(
			getApi('api/user/logout'),
			axiosConfig
		).then(res => { console.log(res) }).catch(err => { alert(err) })



	};
	const loginStatus = useSelector((state) => state.user.login);
	return (
		<div>
			{loginStatus.userJwt !== "" && loginStatus.isLoggedIn === true ? (
				<div className='header'>
					<Link to='/'>
						<div className='header__left'>
							<img src={logo} alt='' />
						</div>
					</Link>
					<div className='header__middle'>
						<div className='header__search'>
							<input type='text' name='' id='' />
							<SearchOutlinedIcon />
						</div>
					</div>
					<div className='header__right'>
						<HeaderOption Icon={HomeRoundedIcon} title='Home' />
						<HeaderOption Icon={PeopleRoundedIcon} title='My Network' />
						<HeaderOption Icon={WorkRoundedIcon} title='Jobs' />
						<HeaderOption Icon={ChatRoundedIcon} title='Messaging' />
						<HeaderOption
							Icon={NotificationsRoundedIcon}
							title='Notifications'
						/>
						<HeaderOption
							avatar='https://media-exp1.licdn.com/dms/image/C4E03AQHRjLPA2E9-Gg/profile-displayphoto-shrink_400_400/0/1616477273357?e=1635379200&v=beta&t=uyHlw8T8hcTuHBfRKVe1aYnxIg_eQMAvikk8_UqglZY'
							title='Deepanshu'
						/>
						<Link to='/'>
							<button className='loginHeader__button' onClick={handleLogout}>
								Logout
							</button>
						</Link>
					</div>
				</div>
			) : (
				<div>
					<div className='loginHeader' style={{ width: "100vw" }}>
						<Link to='/'>
							<div className='loginHeader__left'>
								<img src={logo} alt='' />
							</div>
						</Link>
						<div className='loginHeader__right'>
							<Link to='/login'>
								<button className='loginHeader__button'>Sign Up</button>
							</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Header;
