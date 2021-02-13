import { useRef } from "react";
import { useDetectOutsideClick } from "@/utils/useDetectOutsideClick";

const { Avatar } = require("@chakra-ui/react");

const NavDropdown = ({ auth }) => {
	const dropdownRef = useRef(null);
	const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
	const onClick = () => setIsActive(!isActive);

	return (
		<div className='relative inline-block text-left'>
			<button className='default-focus rounded-full' onClick={onClick}>
				<Avatar
					bg='#444457'
					w='35px'
					h='35px'
					// src={auth.user.photoUrl}
				/>
			</button>

			<div
				ref={dropdownRef}
				className={`origin-top-right absolute right-0 z-20 mt-2 w-56 rounded-md shadow-lg bg-secondary-background ring-1 ring-black ring-opacity-5 divide-y divide-primary-background ${
					isActive ? "visible" : "invisible"
				}`}
				role='menu'
				aria-orientation='vertical'
				aria-labelledby='options-menu'
			>
				<div className='py-1'>
					<p
						className='block px-4 pt-2 pb-1 text-sm text-gray-200'
						role='menuitem'
					>
						Signed in as
					</p>
					<p
						className='just inline-flex items-start px-4 pb-2 text-sm font-semibold text-gray-200'
						role='menuitem'
					>
						{auth?.user.name}
						{auth?.user.userRole == "admin" && (
							<span className='bg-primary-default border-primary-default border-1 bg-opacity-60 text-xxs px-1 ml-2 font-normal tracking-wide text-purple-100 uppercase rounded-md'>
								{auth?.user.userRole}
							</span>
						)}
					</p>
				</div>
				<div className='py-1'>
					<a
						href='#'
						className='hover:bg-secondary-card block px-4 py-2 text-sm text-gray-500 pointer-events-none'
						role='menuitem'
					>
						Account settings
					</a>
				</div>
				<div className='py-1'>
					<button
						onClick={auth.signout}
						className='hover:bg-secondary-card block w-full px-4 py-2 text-sm text-left text-gray-200'
						role='menuitem'
					>
						Sign out
					</button>
				</div>
			</div>
		</div>
	);
};

export default NavDropdown;
