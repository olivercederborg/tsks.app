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
				<Avatar w='35px' h='35px' src={auth.user.photoUrl} />
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
						className='block px-4 py-2 text-sm font-semibold text-gray-200'
						role='menuitem'
					>
						Signed in as {auth?.user.name}
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
