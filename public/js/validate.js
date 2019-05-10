document.querySelector('form').addEventListener('submit', e => {
	validateFullName(e);
	validateEmail(e);
	validatePassword(e);
	validateConfirm(e);
});

document.querySelector('form').addEventListener('keyup', e => removeErrorMessage(e));


////// ERROR HANDLERS /////////////////////////////////////////

function errorMessage(id, message) {
	let error = document.createElement('span');
	error.innerHTML = message;
	error.classList.add('error', 'red-text');
	document.getElementById(id).appendChild(error);
}

function removeErrorMessage(e) {
	const parent = e.target.parentNode;
	if (e.target.tagName === 'INPUT' && parent.lastElementChild.classList.contains('error')) {
		parent.removeChild(parent.lastElementChild);
	}
}

////// VALIDATION //////////////////////////////////////////////

function validateFullName(e) {
	let fullName = document.getElementById('fullName').value;
	if (fullName.length < 3) {
		e.preventDefault();
		errorMessage('fullNameContainer', 'Your Name must be at least 3 characters long');
	} else if (fullName.length > 30) {
		e.preventDefault();
		errorMessage('fullNameContainer', 'Your Name must not exceed 30 characters');
	} else if (fullName.match(/\d+/g)) {
		e.preventDefault();
		errorMessage('fullNameContainer', 'Your Name must include only letters');
	}
}

function validatePassword(e) {
	let pass = document.getElementById('password').value;
	if (pass.length < 6) {
		e.preventDefault();
		errorMessage('passContainer', 'Your Password must contain at least 6 characters');
	} else if (!pass.match(/\d+/g)) {
		e.preventDefault();
		errorMessage('passContainer', 'Your Password must contain at least 1 number');
	}
}

function validateConfirm(e) {
	let pass = document.getElementById('password').value;
	let confirmPass = document.getElementById('confirmPassword').value;

	if (pass !== confirmPass) {
		e.preventDefault();
		errorMessage('confirmContainer', 'Passwords don\'t match');
	}
}

function validateEmail(e) {
	let email = document.getElementById('email').value;
	const regex = /[\w-\.]+@[\w]+\.[a-zA-Z]+(\.[a-zA-Z]+)?/g;

	if(!email.match(regex)) {
		e.preventDefault();
		errorMessage('emailContainer', 'Invalid Email Address');
	}
}