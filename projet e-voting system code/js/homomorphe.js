const p = new BigInteger('some_large_prime'); // Choose a large prime number
const q = new BigInteger('another_large_prime'); // Another large prime number
const n = p.multiply(q); // Modulus for public key

function encryptVote(vote) {
    var c=vote.map(v => new BigInteger(v.toString()).modPow(new BigInteger('65537'), n));
    return [c,n]
}

const votes = [];

function vote(candidateVotes,candidateVotes1) {
    const votes = [];
    votes.push(candidateVotes);
    votes.push(candidateVotes1);

    // Aggregate encrypted votes
    let encryptedSum = [0, 0];
    for (i=0;i<encryptedSum.length;i++){
        for(j=0;j<votes.length;j++){
            encryptedSum[i] = encryptedSum[i].add(vote[j][i]).mod(n);
        }
    }
    /*votes.forEach(vote => {
      for (let i = 0; i < vote.length; i++) {
        encryptedSum[i] = encryptedSum[i].add(vote[i]).mod(n);
      }
    });*/

    // Decrypt the aggregated sum
    const decryptedSump = decryptSum(encryptedSum);
    return decryptedSump
  }

  function decryptSum(sum) {
    const phi = p.subtract(BigInteger.ONE).multiply(q.subtract(BigInteger.ONE));
    const d = new BigInteger('65537').modInverse(phi);
    return sum.map(s => s.modPow(d, n).toString());
  }

              /*decy=CryptoJS.AES.decrypt(chif,'myKey')
            f=decy.toString(CryptoJS.enc.Utf8)
            f=parseInt(f)*/