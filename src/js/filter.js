export function currencys(x,c) {
	let f_x = parseFloat(x);
	if(isNaN(f_x)) {

		return '$0';
	}
	let isMoreThanZero = f_x < 0;
	if(isMoreThanZero) {

		x *= -1;
	}
	f_x = Math.round(x * 100) / 100;
	let s_x = f_x.toString();
	let pos_decimal = s_x.indexOf('.');
	if(pos_decimal < 0) {
		pos_decimal = s_x.length;
		s_x += '.';
	}
	while(s_x.length <= pos_decimal + 2) {
		s_x += '0';
	}
	if(c==undefined||c==''){
		c='$';
	}
	if(isMoreThanZero) {
		return '-'+c + s_x;
	} else {
		return c + s_x;
	}
}