// use openpgpjs to decrypt a pgp symmetric key-encrypted blogpost
var openpgp = window.openpgp;
openpgp.initWorker({ path:'/js/openpgp.worker.min.js' });

var encrypted = $('#encryptedText pre').html();

function handleDecryptSuccess(plaintext) {
  $('#errorMsg').addClass('d-none');
  $('#plainText').removeClass('d-none');
  $('#encryptedText').addClass('d-none');
  $('#plainText p').html(plaintext.data);
  return plaintext.data;
}

function handleDecryptError(error) {
  console.log(error);
  $('#errorMsg').removeClass('d-none');
}

async function symDecrypt(encrypted, pw) {
  var options = {
    message: await openpgp.message.readArmored(encrypted),
    passwords: [pw],
  };

  openpgp.decrypt(options)
    .then(handleDecryptSuccess, handleDecryptError);
}

$('#submitDecrypt').on('click', function(a) {
  var pw = $('#pwInput').val();
  $('#decryptModal').modal('hide');
  symDecrypt(encrypted, pw);
});

