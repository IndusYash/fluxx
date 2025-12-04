#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;


vector<long long> primes = {2, 3, 5, 7, 11, 13, 17, 19};


long long gcd(long long a, long long b) {
    while (b) {
        long long temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<long long> a(n);
        for (int i = 0; i < n; ++i)
            cin >> a[i];
        long long answer = -1;
        for (long long p : primes) {
            for (int i = 0; i < n; ++i) {
                if (gcd(a[i], p) == 1) {
                    answer = p;
                    break;
                }
            }
            if (answer != -1) break;
        }
        cout << answer << endl;
    }
    return 0;
}
