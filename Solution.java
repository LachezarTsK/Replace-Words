
import java.util.List;

public class Solution {

    public String replaceWords(List<String> dictionary, String sentence) {
        Trie trie = new Trie();
        addAllWordsInDictionaryToTrie(dictionary, trie);
        return replaceAllWordsWithTheirShortestRoot(sentence, trie);
    }

    private void addAllWordsInDictionaryToTrie(List<String> dictionary, Trie trie) {
        for (String word : dictionary) {
            trie.addWord(word);
        }
    }

    private String replaceAllWordsWithTheirShortestRoot(String sentence, Trie trie) {
        String[] arrayWords = sentence.split(" ");
        for (int i = 0; i < arrayWords.length; ++i) {
            int indexEndOfRoot = trie.findEndIndexForShortestRoot(arrayWords[i]);
            if (indexEndOfRoot >= 0) {
                arrayWords[i] = arrayWords[i].substring(0, indexEndOfRoot + 1);
            }
        }
        return String.join(" ", arrayWords);
    }
}

class Trie {

    private static final int ALPHABET_SIZE = 26;
    private static final int NO_ROOT_FOUND = -1;
    private final TrieNode rootTrieNode = new TrieNode();

    private final class TrieNode {

        TrieNode[] branches = new TrieNode[ALPHABET_SIZE];
        boolean isEndOfWordRoot;
    }

    void addWord(String word) {
        TrieNode current = rootTrieNode;
        for (int indexWord = 0; indexWord < word.length(); ++indexWord) {
            int indexBranches = word.charAt(indexWord) - 'a';
            if (current.branches[indexBranches] == null) {
                current.branches[indexBranches] = new TrieNode();
            }
            current = current.branches[indexBranches];
        }
        current.isEndOfWordRoot = true;
    }

    int findEndIndexForShortestRoot(String word) {
        TrieNode current = rootTrieNode;
        for (int indexWord = 0; indexWord < word.length(); ++indexWord) {
            int indexBranches = word.charAt(indexWord) - 'a';
            if (current.branches[indexBranches] == null) {
                break;
            }
            current = current.branches[indexBranches];
            if (current.isEndOfWordRoot) {
                return indexWord;
            }
        }
        return NO_ROOT_FOUND;
    }
}
