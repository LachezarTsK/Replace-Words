
/**
 * @param {string[]} dictionary
 * @param {string} sentence
 * @return {string}
 */
var replaceWords = function (dictionary, sentence) {
    const trie = new Trie();
    addAllWordsInDictionaryToTrie(dictionary, trie);
    return replaceAllWordsWithTheirShortestRoot(sentence, trie);
};

/**
 * @param {string[]} dictionary
 * @param {Trie} trie
 * @return {void}
 */
function addAllWordsInDictionaryToTrie(dictionary, trie) {
    for (let word of dictionary) {
        trie.addWord(word);
    }
}

/**
 * @param {string} sentence
 * @param {Trie} trie
 * @return {string}
 */
function replaceAllWordsWithTheirShortestRoot(sentence, trie) {
    const arrayWords = sentence.split(' ');
    for (let i = 0; i < arrayWords.length; ++i) {
        let indexEndOfRoot = trie.findEndIndexForShortestRoot(arrayWords[i]);
        if (indexEndOfRoot >= 0) {
            arrayWords[i] = arrayWords[i].substring(0, indexEndOfRoot + 1);
        }
    }
    return arrayWords.join(' ');
}

class TrieNode {
    static  ALPHABET_SIZE = 26;
    branches = new Array(TrieNode.ALPHABET_SIZE).fill(null);
    isEndOfWordRoot = false;
}

class Trie {

    static NO_ROOT_FOUND = -1;
    static ASCII_SMALL_CASE_A = 97;
    rootTrieNode = new TrieNode();

    /**
     * @param {string} word
     * @return {void}
     */
    addWord(word) {
        let current = this.rootTrieNode;
        for (let indexWord = 0; indexWord < word.length; ++indexWord) {
            let indexBranches = word.codePointAt(indexWord) - Trie.ASCII_SMALL_CASE_A;
            if (current.branches[indexBranches] === null) {
                current.branches[indexBranches] = new TrieNode();
            }
            current = current.branches[indexBranches];
        }
        current.isEndOfWordRoot = true;
    }

    /**
     * @param {string} word
     * @return {number}
     */
    findEndIndexForShortestRoot(word) {
        let current = this.rootTrieNode;
        for (let indexWord = 0; indexWord < word.length; ++indexWord) {
            let indexBranches = word.codePointAt(indexWord) - Trie.ASCII_SMALL_CASE_A;
            if (current.branches[indexBranches] === null) {
                break;
            }
            current = current.branches[indexBranches];
            if (current.isEndOfWordRoot) {
                return indexWord;
            }
        }
        return Trie.NO_ROOT_FOUND;
    }
}
