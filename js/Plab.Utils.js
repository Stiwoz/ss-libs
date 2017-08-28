var Plab = Object.assign(Plab || {}, {
	Utils: Object.assign((Plab && Plab.Utils ? Plab.Utils : {}), {
		/**
		 * Controlla se la data corrente è compresa tra due date in input (incluse)
		 * @namespace Plab
		 * @method validateOnline
		 * @param {Number} dataInizio - Data inizio in formato YYYYMMDD
		 * @param {Number} dataFine - Data fine in formato YYYYMMDD
		 * @return {Boolean} true se compresa, false altrimenti
		 */
		validateOnline: function (dataInizio, dataFine){
			var _now = new Date(),
					_mm = _now.getMonth() + 1,
					_dd = _now.getDate();
			_mm = _mm > 9 ? _mm.toString() : '0' + _mm;
			_dd = _dd > 9 ? _dd.toString() : '0' + _dd;
			var _strdate =  Number([_now.getFullYear(), _mm, _dd].join(''));
			return _strdate > dataInizio && _strdate < dataFine;
		},
		/**
		 * Ritorna un colore in HEX random.
		 * es. '#12ef44'
		 * @namespace Plab.Utils
		 * @method randomColor
		 * @return {string} colore in HEX
		 */
		randomColor: function () {
			return "#" + Math.floor(Math.random()*16777215).toString(16);
		},
		/**
		 * Data una stringa come parametro, la ritorna con solo la prima lettera maiuscola ed il resto minuscolo.
		 * @namespace Plab.Utils
		 * @method capitalizeFirstLetter
		 * @param {String} input
		 * @return {string} output con solo prima lettera maiuscola
		 */
		capitalizeFirstLetter: function (input) {
			var _string = input.toString();
			return _string.charAt(0).toUpperCase() + _string.substring(1, _string.length);
		},
		/**
		 * Crea un tag script e lo appende all'head della pagina.
		 * Una volta caricato chiama la funzione di callback (se esiste).
		 * @namespace Plab.Utils
		 * @method loadJs
		 * @param {String} url - url dello script da caricare
		 * @param {Function} callback
		 */
		loadJs: function (url, callback) {
			var head = document.getElementsByTagName('head')[0];
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = url;
			if('function' == typeof callback){
				script.onreadystatechange = callback;
				script.onload = callback;	
			}
			head.appendChild(script);
		},
		/**
		 * Controlla tra tutti parametri in GET dell'url l'esistenza di quello specificato e ne ritorna il valore come stringa.
		 * Se non trovato torna false.
		 * @namespace Plab.Utils
		 * @method getQSParam
		 * @param {String} paramName - nome del parametro da controllare
		 * @return {String || Boolean} valore del parametro trovato || false se non trovato
		 */
		getQSParam: function (paramName) {
			var prmstr = window.location.search.substr(1);
			if(prmstr != null && prmstr != ""){
				var params = {};
				var prmarr = prmstr.split("&");
				for ( var i = 0; i < prmarr.length; i++) {
					var tmparr = prmarr[i].split("=");
					params[tmparr[0]] = tmparr[1];
				}
				return params[paramName] || false;
			} else {
				return false;
			}
		}
	}),
	/**
	 * Controlla l'esistenza di jQuery, se non esiste lo carica.
	 * Controlla se serve jQuery.noConflict().
	 * Alla fine chiama la funzione di callback (se esiste), con come parametro l'istanza di jQuery (da poter usare come $ con scope locale)
	 * @namespace Plab.Utils
	 * @method checkJQuery
	 * @param {Function} callback
	 * @return {Function} funzione con come parametro l'oggetto jQuery (da poter usare come $ con scope locale)
	 */
	checkJQuery: function (callback) {
		if('undefined' == typeof window.jQuery){
			Plab.Utils.loadJs("https://code.jquery.com/jquery-1.12.4.min.js", function () {
				jQuery.noConflict();
				if('function' == typeof callback){
					callback(jQuery);
				}
			});
		} else if ($.fn && $.fn.jquery) { // $.fn.jquery contains the version number
			jQuery.noConflict();
			if('function' == typeof callback){
				callback(jQuery);
			}
		}
	}
});