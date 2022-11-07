
#include <memory>
#include <string>
#include <vector>
#include <sstream>
#include <iterator>
using namespace std;

class Trie {
    
    inline static const int ALPHABET_SIZE = 26;
    inline static const int NO_ROOT_FOUND = -1;

    struct TrieNode {
        array<shared_ptr<TrieNode>, ALPHABET_SIZE> branches;
        bool isEndOfWordRoot{};
    };
    
    const shared_ptr<TrieNode> rootTrieNode = make_shared<TrieNode>();

public:
    void addWord(const string& word)const {
        shared_ptr<TrieNode> current = rootTrieNode;
        for (const auto& letter : word) {
            int indexBranches = letter - 'a';
            if (current->branches[indexBranches] == nullptr) {
                current->branches[indexBranches] = make_shared<TrieNode>();
            }
            current = current->branches[indexBranches];
        }
        current->isEndOfWordRoot = true;
    }

    int findEndIndexForShortestRoot(const string& word) const {
        shared_ptr<TrieNode> current = rootTrieNode;
        for (int indexWord = 0; indexWord < word.length(); ++indexWord) {
            int indexBranches = word[indexWord] - 'a';
            if (current->branches[indexBranches] == nullptr) {
                break;
            }
            current = current->branches[indexBranches];
            if (current->isEndOfWordRoot) {
                return indexWord;
            }
        }
        return NO_ROOT_FOUND;
    }
};

class Solution {
    
public:
    string replaceWords(const vector<string>& dictionary, string& sentence) const {
        Trie trie;
        addAllWordsInDictionaryToTrie(dictionary, trie);
        return replaceAllWordsWithTheirShortestRoot(sentence, trie);
    }

private:
    void addAllWordsInDictionaryToTrie(const vector<string>& dictionary, const Trie& trie) const {
        for (const auto& word : dictionary) {
            trie.addWord(word);
        }
    }

    string replaceAllWordsWithTheirShortestRoot(const string& sentence, const Trie& trie) const {
        stringstream stream(sentence);
        string word;
        string result;

        while (getline(stream, word, ' ')) {
            int indexEndOfRoot = trie.findEndIndexForShortestRoot(word);
            if (indexEndOfRoot >= 0) {
                result.append(word.substr(0, indexEndOfRoot + 1));
            } else {
                result.append(word);
            }
            result.push_back(' ');
        }
        return result.substr(0, result.size() - 1);
    }
};
